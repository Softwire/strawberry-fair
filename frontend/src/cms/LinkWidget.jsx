import React from 'react'
import CMS from 'netlify-cms-app'
import { Map, List } from 'immutable'
import pagePaths from '../data/pagePaths'

// Following https://www.netlify.com/blog/2017/06/20/extending-netlify-cms-part-one-custom-widgets/

const SelectionControl = CMS.getWidget('select').control
let dropDownItems = getDropDownItems()
let menuPath = []
const backOptionText = "<-- Previous Menu"

export class LinkControl extends React.Component {
  render() {
    return (
      <div>
        <SelectionControl 
        {...this.props}
        onChange = {val => this.handleSelectionChange(val)}
        field={this.getFields()}
      />
      </div>
      )
  }

  handleSelectionChange(value) {
      if (value === backOptionText) {
        menuPath.pop()
        this.props.onChange("")
      }
      else {
        const valueList = value.split("/")
        if(valueList[valueList.length-1] !== "index") menuPath.push(valueList[valueList.length-1])
        //we couldn't assign value directly to this.props.value since it could contain "index". Instead we build this.props.value from the menuPath.
        menuPath.length === 0 ? this.props.onChange("/") : this.props.onChange("/" + menuPath.join("/"))
        //this line is needed to update menuPath, otherwise making the same selection twice will not call the getFields() function, since react doesn't update the component
        this.getFields()
      }
  }

  getFields() {
    return new Map({options: this.getListOfMenuOptions()})
  }

  getListOfMenuOptions() {
    let dropDownItemsList = new List(Object.keys(this.getDropDownItemsFromMenuPath()))
    const prefix = menuPath.length === 0 ? "/" : "/" + menuPath.join("/") + "/"
    dropDownItemsList = dropDownItemsList.map(element => prefix + element)
    return dropDownItemsList.concat(new List([backOptionText]))
  }

  getDropDownItemsFromMenuPath() {
    if(menuPath.length === 0) return dropDownItems
    else return this.getObjectFromList(menuPath, dropDownItems)
  }

  getObjectFromList(list, inputObject) {
    if(list.length === 1) {
      if(list[0] !== "index") {
        const nextObject = inputObject[list[0]]
        const nextObjectKeys = Object.keys(nextObject)
        if(nextObjectKeys.length === 1 && nextObjectKeys[0] === "index" ){
          menuPath.pop()
          return inputObject
        } 
        else return inputObject[list[0]]
      }
      else {
        return this.getObjectFromList(menuPath.slice(0, menuPath.length-1), dropDownItems)
      }
    }
    else return this.getObjectFromList(list.slice(1), inputObject[list[0]])
  }
}

export const LinkPreview = props => (
  <div><strong>Link: </strong>{JSON.stringify(props.value)}</div>
)


function getDropDownItems() {
  const dropDownItemsList = []
  pagePaths.pagePaths.forEach(path => {
    path = path.split("/").filter(element => element !== "")
    if(path[0] !== "dev-404-page") {
        path.push("/")
        dropDownItemsList.push(path)
    }
  })
  return convertListToObject(dropDownItemsList)
}


function convertListToObject(dropDownItemsList) {
  let pathObject = {}
  dropDownItemsList.forEach(path => {
    pathObject = insertPathToObject(path, pathObject)
  }
  )
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