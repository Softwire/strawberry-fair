import pagePaths from '../data/pagePaths'

export function getDropDownItems() {
    const dropDownItemsList = []
    pagePaths.pagePaths.forEach(path => {
      path = path.split("/").filter(element => element !== "")
      path.push("/")
      dropDownItemsList.push(path)
    })
    return convertListToObject(dropDownItemsList)
  }
  
  
function convertListToObject(dropDownItemsList) {
    let pathObject = {}
    dropDownItemsList.forEach(path => {
        pathObject = insertPathToObject(path, pathObject)
    })
    return pathObject
}

function insertPathToObject(path, object) {
    if (path.length > 1) {
        if(!(path[0] in object)) object[path[0]] = insertPathToObject(path.slice(1), {})
        else object[path[0]] = insertPathToObject(path.slice(1), object[path[0]])
    }
    else object["index"] = "/"
    return object
}