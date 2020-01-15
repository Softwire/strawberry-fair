const separator = '/'

export const getPreviewLinksFromCMSInput = (CMSInput) => (
  [{
    node: {
      frontmatter: {
        title: CMSInput.title,
        pageTitles: CMSInput.pageTitles.map(page => {
          page.pageTitle = page.pageTitle || ""
          page.slug = "/"
          return page
        })
      }
    }
  }]
)

export const generateLinks = (navBarTabs, titleToLinkMap, graphqlEdges) => {
  return navBarTabs.map(tabName => {
      const associatedEdge = graphqlEdges.find(edge => edge.node.frontmatter.title === tabName)
      return associatedEdge || titleToLinkMap[tabName] || undefined
      }).filter(link => link !== undefined)
}

export const getClassName = (baseName, toggleName, active) => `${baseName} ${active ? toggleName : ""}`

export const getTitle = (pageTitle) => pageTitle.split(separator)[1]

export const addSlugs = (map, graphqlEdge) => {
  graphqlEdge.node.frontmatter.pageTitles.forEach(o => o.slug = map[getTitle(o.pageTitle)])
}

