import React from 'react'
import CMS from 'netlify-cms-app'
import { Map, List } from 'immutable'
import { getPagePathTreeObject, getSubTreeObject } from '../util/data-parser.js'

// Following https://www.netlify.com/blog/2017/06/20/extending-netlify-cms-part-one-custom-widgets/

const SelectionControl = CMS.getWidget('select').control
let pagePathTreeObject = getPagePathTreeObject()
const backOption = "<-- Previous Menu"

export class LinkControl extends React.Component {
  constructor(props) {
    super(props)
    this.selectedOptionsHistory = []
  }
  render() {
    return (
      <div>
        <SelectionControl 
          {...this.props}
          onChange = {selectedOption => this.handleSelectionChange(selectedOption)}
          field={this.getFields()}
        />
      </div>
      )
  }

  handleSelectionChange(selectedOption) {
      if (selectedOption === backOption) {
        this.selectedOptionsHistory.pop()
        //this makes sure that the menu field is re-rendered
        this.props.onChange("")
      }
      else {
        const selectedOptionWithoutPrefix = selectedOption.split("/").slice(-1)[0]
        if(selectedOptionWithoutPrefix !== "index") this.selectedOptionsHistory.push(selectedOptionWithoutPrefix)
        //we couldn't assign value directly to this.props.value since it could contain "index". Instead we build this.props.value from the menuPath.
        this.props.onChange("/" + this.selectedOptionsHistory.join("/"))
        //this line is needed to update menuPath, otherwise making the same selection twice will not call the getFields() function, since react doesn't update the component
        this.getFields()
      }
  }

  getFields() {
    return new Map({options: this.getMenuOptionsList()})
  }

  getMenuOptionsList() {
    let menuOptionsList = new List(Object.keys(this.getMenuOptionsObject()))
    const prefix = this.selectedOptionsHistory.length === 0 ? "/" : "/" + this.selectedOptionsHistory.join("/") + "/"
    menuOptionsList = menuOptionsList.map(element => prefix + element)
    return menuOptionsList.concat(new List([backOption]))
  }

  getMenuOptionsObject() {
    if(this.selectedOptionsHistory.length === 0) return pagePathTreeObject
    else {
    const [ menuOptionsObject, updatedOptionsHistory] = getSubTreeObject(this.selectedOptionsHistory, pagePathTreeObject, "index")
    this.selectedOptionsHistory = updatedOptionsHistory
    return menuOptionsObject
    }
  }
}

export const LinkPreview = props => (
  <div><strong>Link: </strong>{JSON.stringify(props.value)}</div>
)