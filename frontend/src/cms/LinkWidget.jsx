import React from 'react'
import CMS from 'netlify-cms-app'
import { Map, List } from 'immutable'
import { getDropDownItems } from '../util/data-parser.js'

// Following https://www.netlify.com/blog/2017/06/20/extending-netlify-cms-part-one-custom-widgets/

const SelectionControl = CMS.getWidget('select').control
let dropDownItems = getDropDownItems()
const backOptionText = "<-- Previous Menu"

export class LinkControl extends React.Component {
  constructor(props) {
    super(props)
    this.menuPath = []
  }
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
        this.menuPath.pop()
        this.props.onChange("")
      }
      else {
        const valueList = value.split("/")
        if(valueList[valueList.length-1] !== "index") this.menuPath.push(valueList[valueList.length-1])
        //we couldn't assign value directly to this.props.value since it could contain "index". Instead we build this.props.value from the menuPath.
        this.props.onChange("/" + this.menuPath.join("/"))
        //this line is needed to update menuPath, otherwise making the same selection twice will not call the getFields() function, since react doesn't update the component
        this.getFields()
      }
  }

  getFields() {
    return new Map({options: this.getMenuOptionsList()})
  }

  getMenuOptionsList() {
    let dropDownItemsList = new List(Object.keys(this.getMenuOptionsObject()))
    const prefix = this.menuPath.length === 0 ? "/" : "/" + this.menuPath.join("/") + "/"
    dropDownItemsList = dropDownItemsList.map(element => prefix + element)
    return dropDownItemsList.concat(new List([backOptionText]))
  }

  getMenuOptionsObject() {
    return this.menuPath.length === 0 ? dropDownItems : this.getMenuOptionsFromMenuPath(this.menuPath, dropDownItems)
  }

  getMenuOptionsFromMenuPath(menuPathAhead, currentMenuOptionsObject) {
    if(menuPathAhead.length === 1) {
      if(menuPathAhead[0] !== "index") {
        const nextObject = currentMenuOptionsObject[menuPathAhead[0]]
        const nextObjectKeys = Object.keys(nextObject)
        if(nextObjectKeys.length === 1 && nextObjectKeys[0] === "index" ){
          this.menuPath.pop()
          return currentMenuOptionsObject
        } 
        else return currentMenuOptionsObject[menuPathAhead[0]]
      }
      else {
        return this.getMenuOptionsFromMenuPath(this.menuPath.slice(0, this.menuPath.length-1), dropDownItems)
      }
    }
    else return this.getMenuOptionsFromMenuPath(menuPathAhead.slice(1), currentMenuOptionsObject[menuPathAhead[0]])
  }
}

export const LinkPreview = props => (
  <div><strong>Link: </strong>{JSON.stringify(props.value)}</div>
)