const path = require('path')
const remark = require('remark')
const remarkHtml = require('remark-html')
const { createFilePath, createRemoteFileNode } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
//imports a js script that generates pages for monthly and yearly news
const newsGenerator = require('./src/scripts/news-generator')
//imports a js script that generates a json file with all the page paths on the website.
const savePagePaths = require('./src/scripts/save-page-paths')

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

    if(node.frontmatter.templateKey === 'news-article') {
      const fileNode = await createRemoteFileNode({
        url: node.frontmatter.image.src, // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store, // Gatsby's redux store
      })
      // if the file was created, attach the new node to the parent node
      if (fileNode) {
        // eslint-disable-next-line require-atomic-updates
        node.frontmatter.image.srcFile___NODE = fileNode.id
      }
    }
  }
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
