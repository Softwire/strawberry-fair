import React from 'react'
import CMS from 'netlify-cms-app'
import { Map, List } from 'immutable'
import { getPageTreeObject, getSubTree } from '../util/data-parser.js'
import PropTypes from 'prop-types'

// Following https://www.netlify.com/blog/2017/06/20/extending-netlify-cms-part-one-custom-widgets/

const SelectionControl = CMS.getWidget('select').control
const pageTreeObject = getPageTreeObject()
const backOption = "<-- Previous Menu"

export class LinkControl extends React.Component {
  constructor(props) {
    super(props)
    this.selectedOptionsHistory = typeof props.value === "string" ? props.value.split("/").slice(1) : []
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
      const selectedOptionWithoutPrefix = selectedOption.split("/").pop()
      this.selectedOptionsHistory = this.getCurrentRouteArray()
      this.selectedOptionsHistory.push(selectedOptionWithoutPrefix)
      
      const currentRouteArray = this.getCurrentRouteArray()
      if (currentRouteArray.length === this.selectedOptionsHistory.length - 1) {
        currentRouteArray.push('index')
      }
      this.props.onChange(`/${currentRouteArray.join("/")}`)
      //this line is needed to update menuPath, otherwise making the same selection twice will not call the getFields() function, since react doesn't update the component
      this.getFields()
    }
  }

  getFields() {
    return new Map({options: this.getMenuOptionsList()})
  }

  getMenuOptionsList() {
    let menuOptionsList = new List(Object.keys(this.getMenuOptionsObject()))
    const prefixRoute = this.getCurrentRouteArray()
    const prefix = prefixRoute.length === 0 ? "/" : `/${prefixRoute.join("/")}/`
    menuOptionsList = menuOptionsList.map(element => prefix + element)
    return menuOptionsList.concat(new List([backOption]))
  }

  getMenuOptionsObject() {
    const currentRouteArray = this.getCurrentRouteArray()
    if (currentRouteArray.length === 0) {
      return pageTreeObject
    } 
    else {
      const [ menuOptionsObject, updatedOptionsHistory ] = getSubTree(currentRouteArray, pageTreeObject, "index")
      this.selectedOptionsHistory = updatedOptionsHistory
      return menuOptionsObject
    }
  }

  getCurrentRouteArray() {
    const selectedOptionsHistoryClone = [...this.selectedOptionsHistory]
    if (selectedOptionsHistoryClone[selectedOptionsHistoryClone.length - 1] === 'index') {
      selectedOptionsHistoryClone.pop()
    }
    return selectedOptionsHistoryClone
  }
}

export const LinkPreview = props => (
  <div><strong>Link: </strong>{JSON.stringify(props.value)}</div>
)

LinkControl.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
}

LinkPreview.propTypes = {
  value: PropTypes.string
}