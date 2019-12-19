import pagePaths from '../data/pagePaths'

export function getPageTreeObject() {
    const routesList = []
    pagePaths.pagePaths.forEach(path => {
      const route = path.split("/").filter(element => element !== "")
      routesList.push(route)
    })
    return convertRoutesListToTreeObject(routesList)
  }
  
function convertRoutesListToTreeObject(routesList) {
    let treeObject = {}
    routesList.forEach(route => {
        treeObject = insertRouteToTree(route, treeObject)
    })
    return treeObject
}

function insertRouteToTree(route, treeObject) {
    if (route.length > 0) {
        if(!(route[0] in treeObject)) {
          treeObject[route[0]] = insertRouteToTree(route.slice(1), {})
        }
        else {
          treeObject[route[0]] = insertRouteToTree(route.slice(1), treeObject[route[0]])
        }
    }
    else {
      treeObject["index"] = "/"
    }
    return treeObject
}

/**
 * This function receives a tree object and a ro It then ute.follows the route through the branches,
 * and returns the sub-tree at the end of the route. If you want to make sure the branch returned is
 * a sub-tree, then specify the key of an end branch. Besides a sub-tree, this function also returns 
 * an updated route. This route is the same as the route given in the argument, except that it will 
 * cut off the last step if it leads to an isolated end branch (an isolated branch is a branch with no 
 * parallel branches to it).
 * 
 * @param {list of strings} route         list of the keys to navigate through the branches.
 * @param {object}          tree          tree object (object with other object as values that may themselves contain other objects).
 * @param {string}          endBranchKey  An end branch is an object that doesn't point to another object. this argument is optional. 
 *                                        Specify it if you want to make sure this function always returns an object. 
 *                                        When it reaches an end branch, it returns the parent tree.
 * @param {list of strings} originalRoute NEVER specify this argument, let it be the default value. It stores the route value. 
 *                                        Needed because this function is recursive.
 */


export function getSubTree(route, tree, endBranchKey, originalRoute = route) {
    const chosenBranchKey = route[0]
    //go from tree to subtree (a branch of tree) until you reach the end of the route
    if(route.length > 1) {
      return getSubTree(route.slice(1), tree[chosenBranchKey], endBranchKey, originalRoute)
    }

    //when you reach the end of the route, if the branch key equals the end branch key, 
    //it means we dived to deep into the original tree, we must return the current tree (and not the subtree on the end branch, since the end branch is not an object)
    if(chosenBranchKey === endBranchKey) {
      return [tree, originalRoute]
    }
 
    const subTree = tree[chosenBranchKey]
    const subTreeBranchKeys = Object.keys(subTree)
    //when you reach the end of the route, if the subtree only has one branch, and that branch is an end branch, then we return
    //the current tree, and update the complete route to not include the last step. We do this because a subtree with an end branch 
    //only is effecively an end branch as well. 
    if(subTreeBranchKeys.length === 1 && subTreeBranchKeys[0] === endBranchKey ) {
      originalRoute.pop()
      return [tree, originalRoute]
    } 
    
    //when you reach the end of the route and the subtree is as expected, simply return it
    //(i.e. it either has more than one branch or it only has one branch that is not an end branch)
    return [tree[chosenBranchKey], originalRoute]
  }
   
