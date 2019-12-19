import pagePaths from '../data/pagePaths'

export function getPagePathTreeObject() {
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

export function getSubTreeObject(routeThroughTree, treeObject, endBranchKey, originalRouteThroughTree = routeThroughTree) {
    const chosenBranchKey = routeThroughTree[0]
    if(routeThroughTree.length === 1) {
      if(chosenBranchKey !== endBranchKey) {
        const subTree = treeObject[chosenBranchKey]
        const subTreeBranchKeys = Object.keys(subTree)
        if(subTreeBranchKeys.length === 1 && subTreeBranchKeys[0] === endBranchKey ){
          originalRouteThroughTree.pop()
          return [treeObject, originalRouteThroughTree]
        } 
        else return [treeObject[chosenBranchKey], originalRouteThroughTree]
      }
      else return this.getSubTreeObject(originalRouteThroughTree.slice(0, originalRouteThroughTree.length-1), treeObject, endBranchKey, originalRouteThroughTree)
    }
    else return this.getSubTreeObject(routeThroughTree.slice(1), treeObject[chosenBranchKey], endBranchKey, originalRouteThroughTree)
  }
