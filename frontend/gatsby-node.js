const path = require('path')
const remark = require('remark')
const remarkHtml = require('remark-html')
const removeMd = require('remove-markdown')
const { mkdir } = require('fs')
const { createFilePath, createRemoteFileNode } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
//imports a js script that generates pages for monthly and yearly news
const newsGenerator = require('./src/scripts/news-generator')
//imports a js script that generates a json file with all the page paths on the website.
const savePagePaths = require('./src/scripts/save-page-paths')
//imports a js script that grabs a list of images from Cloudinary to use as a default banner if no image is specified
const bannerImages = require('./src/scripts/get-banner-images')
//js util function to generate an ics file from event data
const { generateEventICS } = require('./src/util/generateEventICS')

exports.sourceNodes = async ({actions, cache, store, createNodeId, createContentDigest, getNode}) => {
  // Create a top-level node, that can be queried from within GraphQL, which contains
  // GatsbyImageSharpFluid-shaped links to all of the images in the Cloudinary "Banner" folder

  const { createNode, createParentChildLink } = actions

  // First, get the list of the URLs of the default banner images from Cloudinary
  // getBannerImages() returns a Promise
  // On the free tier of Cloudinary, we are allowed 500 API calls per hour. We shouldn't hit this, but it's useful to know while testing
  // Also, it will return a maximum of 500 images, but again there are unlikely to be more than 500 banner images in the folder
  let bannerImagesList = []
  try {
    const bannerImagesJson = await bannerImages.getBannerImages()

    // Handle case where no images come back
    if (bannerImagesJson.total_count > 0) {
      bannerImagesList = bannerImagesJson.resources.map(resource => resource.url)
    } else {
      console.warn("No banner images found. Is this intentional?")
    }
  } catch (e) {
    // API call failed
    console.error(e)

    // Continue, just leave the list empty
  }

  // Create top-level node to hold these
  const topLevelID = createNodeId("default-banner-images-parent-node")
  await createNode({
    id: topLevelID,
    name: "defaultBannerImagesParent",
    description: "This node holds the default banner images that can be used in pages' banners.",
    internal: {
      type: "DefaultBannerImagesParent",
      contentDigest: createContentDigest("")
    }
  })
  const parentNode = getNode(topLevelID)

  // Add all the remote image URLs as children of this node
  return Promise.all(bannerImagesList.map(url => {
    createRemoteFileNode({
      url: url,
      parentNodeId: topLevelID,
      createNode,
      createNodeId,
      cache,
      store
    }).then(fileNode => {
      createParentChildLink({parent: parentNode, child: fileNode})
    })
  }))
}

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const result = await graphql(`
    {
      allMarkdownRemark(filter: {frontmatter: {templateKey: {ne: null}}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()))
    return Promise.reject(result.errors)
  }

  const posts = result.data.allMarkdownRemark.edges

  posts.forEach(edge => {
    const id = edge.node.id
    createPage({
      path: edge.node.fields.slug,
      tags: edge.node.frontmatter.tags,
      component: path.resolve(
        `src/templates/${String(edge.node.frontmatter.templateKey)}.jsx`
      ),
      // additional data can be passed via context
      context: {
        id,
      },
    })
  })
  await newsGenerator.NewsInTimeIntervalGenerator({ actions: { createPage }, graphql })

  await savePagePaths.savePagePathsToFile({ actions: graphql })
}

exports.onCreateNode = async ({ node, actions, getNode, store, cache, createNodeId }) => {
  const { createNodeField, createNode } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    addHtmlConvertedMarkdownField(node, createNodeField)

    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    await deepConvertImageUrlsToGatsbyNodes(node, node.id, createNode, createNodeId, cache, store)
  }

  // If this node holds data for an event, generate a calendar .ics file in /public
  mkdir(`${__dirname}/public/ics/events`, {recursive: true}, () => {
    if (node.internal.type === "MarkdownRemark" && node.frontmatter.templateKey === "event-info") {
      const filePath = `${__dirname}/public/ics${node.fields.slug.slice(0, -1)}.ics`
      const dateTimeRange = node.frontmatter.dateTimeRange
      generateEventICS(
        filePath,
        node.frontmatter.title,
        dateTimeRange.startDateTime,
        dateTimeRange.provideEnd ? dateTimeRange.endDateTime : dateTimeRange.startDateTime,
        removeMd(node.rawMarkdownBody)
      )
    }
  })
}

// Currently this only works for the Content Blocks in the homepage!
const addHtmlConvertedMarkdownField = (node, createNodeField) => {
  if(node.frontmatter && node.frontmatter.contentBlocks) {
    const convertedHtmls = node.frontmatter.contentBlocks.map(block => remark()
        .use(remarkHtml)
        .processSync(block._markdown_contentBody)
        .toString()
      )

    createNodeField({
      name: `contentBlocksHtml`,
      node,
      value: convertedHtmls,
    })
  }
}

/**
 * 
 * @param {Object} obj - Object to process
 * @param {String} parentNodeId - Id of the parent node of the fileNode you are going to create
 * @param {Function} createNode - Helper function in gatsby-node to generate the node
 * @param {Function} createNodeId - Helper function in gatsby-node to generate the node id
 * @param {Object} cache - Gatsby's cache
 * @param {Object} store - Gatsby's redux store
 */
const deepConvertImageUrlsToGatsbyNodes = async (obj, parentNodeId, createNode, createNodeId, cache, store) => {
  const values = Object.values(obj)
  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    if ((typeof value === 'string' || value instanceof String) && value.startsWith('https://res.cloudinary.com/strawberryfair/image/upload/')) {
      try {
        const fileNode = await createRemoteFileNode({
          url: value,
          parentNodeId,
          createNode,
          createNodeId,
          cache,
          store,
        })
      
      // if the file was created, attach the new node to the parent node
      if (fileNode) {
        // eslint-disable-next-line require-atomic-updates
        obj.srcNode___NODE = fileNode.id
      }

    } catch (e) {
      console.error(`An error occured accessing an image. Has it been removed? ${value}`)
    }

    } else if (typeof value === 'object' && value !== null) {
      await deepConvertImageUrlsToGatsbyNodes(value, parentNodeId, createNode, createNodeId, cache, store)
    } 
  }
}
