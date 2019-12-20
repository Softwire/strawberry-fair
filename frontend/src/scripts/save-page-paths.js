const fs = require('fs')


exports.savePagePathsToFile = async({ actions: graphql }) => {
    let obj = { pagePaths: []}
    const result = await graphql(`
        query pagePathQuery {
        allSitePage {
          edges {
            node {
              path
            }
          }
        }
      }`)
      
    if(result.errors){
      result.errors.forEach(e=>console.error(e.toString()))
      return Promise.reject(result.errors)
    }
    const pagePaths = result.data.allSitePage.edges
    pagePaths.forEach(edge => obj.pagePaths.push(edge.node.path))
    let json = JSON.stringify(obj)
    fs.writeFile('./src/data/pagePaths.json',json,'utf-8', function(error) {
      if(error) {
        throw error
      }
    })
  }
  