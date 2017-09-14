import React, { Component }                 from "react";
import {Nav, NavItem,
        NavDropdown, MenuItem} 							from 'react-bootstrap';
import API										              from '../../api'

class Navbar extends Component {

  constructor() {
		super()
		this.state = {
			categories: []
		}
    this.renderCategoryMenu =    this.renderCategoryMenu.bind(this)
    this.getCategories =         this.getCategories.bind(this)
	}

  getCategories = (cb) => {
    //let catarray = []
    API.getAllCategories().then(function(categories) {
      let catarray = categories.categories.map((category) => {
        return category.name
      })
      return cb(catarray)

    })
  }

  renderCategoryMenu = () => {
		return this.state.categories.map(category => (
			<MenuItem href={'/category/' + category} eventKey="4.1">{category}</MenuItem>
	   ))
   }

  componentWillMount () {
    this.getCategories((catarray) => {
      this.setState({categories: catarray})
      })
	 	}

  render() {
    return(
      <Nav bsStyle="tabs" activeKey="1"  >
        <NavItem href="/">Home</NavItem>
        <NavDropdown title="Select Categories" id="nav-dropdown">
          {this.renderCategoryMenu()}
        </NavDropdown>
      </Nav>
      )
    }
  }

export default Navbar;
