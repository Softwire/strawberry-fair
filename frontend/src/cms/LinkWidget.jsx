import React from 'react'
import CMS from 'netlify-cms-app'
import { Map, List } from 'immutable'
import pagePaths from '../data/pagePaths'

// Following https://www.netlify.com/blog/2017/06/20/extending-netlify-cms-part-one-custom-widgets/

const SelectionControl = CMS.getWidget('select').control


export class LinkControl extends React.Component {
    render() {
    //getDropDownItems()
    
    const field = new Map({options: new List(pagePaths.pagePaths)})
    return (<SelectionControl {...this.props} field={field}

    />)
  }
}

export const LinkPreview = props => (
  <div><strong>Link: </strong>{JSON.stringify(props.value)}</div>
)

// function getDropDownItems() {
//   const dropDownItems = []
//   pagePaths.pagePaths.forEach(path => {
//     path = path.split("/").filter(element => element !== "")
//     if(path[0] !== "dev-404-page") {
//       if(path[0] != null) dropDownItems.push(path)
//       else dropDownItems.push(["/"])
//     }
//   })
//   let dropDownItemsObject = {}
//   dropDownItemsObject = convertListToObject(dropDownItems, dropDownItemsObject)
//   console.log(dropDownItemsObject)
// }


// function convertListToObject(list) {
//   let pathObject = {}
//   list.forEach(path => {
//     pathObject = insertPathToObject(path, pathObject)
//   }
//   )
//   return object
// }

// function insertPathToObject(path, object) {
//   if (path.length > 1){
//     if(!(path[0] in object)){
//     object[path[0]] = insertPathToObject(path.slice[1], {})
//     }
//     else {
//       object[path[0]] = insertPathToObject(path.slice[1], object[path[0]])
//     }
//   }
//   else {
//     const terminator = {}
//     terminator[path] = "/"
//     object[path] = terminator
//     return object
//   }
// }