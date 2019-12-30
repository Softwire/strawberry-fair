const remark = require('remark')
const remarkHtml = require('remark-html')


exports.addHtmlConvertedMarkdownFields = (node, createNodeField) => {
  if (node.frontmatter) {
    Object.keys(node.frontmatter).forEach(field => createHtmlFieldIfMarkdown(node, createNodeField, field))
  }
}

function createHtmlFieldIfMarkdown(node, createNodeField, field) {
  let value = node.frontmatter[field]
  let fieldValue = null
  let fieldName = field

  if (field.match(/^_markdown_.*/i)) {
    fieldName = "_html_" + field.match(/^_markdown_(.*)/i)[1]

    if (value instanceof Array) {
      fieldValue = value.map(element => getHtml(element))
    }
    else {
      fieldValue = getHtml(value)
    }
  }
  else if (value instanceof Array) {
    fieldValue = getHtmlArray(value)
  }
  else if (value instanceof Object){
    fieldValue = getHtmlObject(value)
  }

  if(fieldValue !== null) {
    createNodeField({
      name: fieldName,
      node,
      value: fieldValue,
    })
  }
}

function getHtmlObject(object) {
  let htmlObject = {}

  Object.keys(object).forEach(key => {
    const value = object[key]
    if (key.match(/^_markdown_.*/i)) {
      const htmlKey = "_html_" + key.match(/^_markdown_(.*)/i)[1]
      if (value instanceof Array) {
        htmlObject[htmlKey] = value.map(element => getHtml(element))
      }
      else {
        htmlObject[htmlKey] = getHtml(value)
      }
    }
    else if (value instanceof Array) {
      htmlObject[key] = getHtmlArray(value)
    }
    else if (value instanceof Object){
      htmlObject[key] = getHtmlObject(value)
    }
  })

  cleanObject(htmlObject)

  return Object.keys(htmlObject).length === 0? null : htmlObject
}

function getHtmlArray(array) {
  let htmlArray = []

  array.forEach( item => {
    if (item instanceof Array) {
      htmlArray.push(getHtmlArray(item))
    }
    else if (item instanceof Object){
      htmlArray.push(getHtmlObject(item))
    }
  })

  cleanArray(htmlArray)

  return htmlArray.length === 0? null : htmlArray
}

function cleanObject(object) {
  Object.keys(object).forEach(key => (object[key] === null || object[key] === undefined) && delete object[key])
}

function cleanArray(array) {
  for (let i = array.length-1; i >= 0; i--) {
    if (array[i] === null || array[i] === undefined) {
        array.splice(i, 1);
    }
  }
}

function getHtml(markdown) {
  return remark().use(remarkHtml).processSync(markdown).toString()
}

exports.getHtml = getHtml