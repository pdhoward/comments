import React, { Component }                 from "react";
import {Nav, NavItem,
        NavDropdown, MenuItem} 							from 'react-bootstrap';
import { Link }                             from "react-router-dom";
import API										              from '../../api'

class Navbar extends Component {

  constructor() {
		super()
		this.state = {
			categories: []
		}
    this.renderCategoryMenu =    this.renderCategoryMenu.bind(this)
	}

  handleSelect(eventKey) {
    console.log(eventKey)
  }


  componentWillMount () {
    API.getAllCategories().then(function(categories) {
      console.log("debug mount")
      console.log(Array.isArray(categories.categories))
      console.log(categories.length)
      console.log(categories)
      let categoryNames = categories.categories.map(function(category) {
        return category.name
      })
      console.log("debug MENU")
      console.log(categoryNames)
      this.setState({categories: categoryNames})
    })
	 	}

	renderCategoryMenu = () => {
    console.log("debug RENDER MENU")
    console.log(this.state)
		return this.state.categories.map(category => (
			<MenuItem eventKey="4.1">{category}</MenuItem>
	   ))
   }

  render() {
    return(
      <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
        <NavItem eventKey="1" href="/home">NavItem 1 content</NavItem>
        <NavItem eventKey="2" title="Item">NavItem 2 content</NavItem>
        <NavItem eventKey="3" disabled>NavItem 3 content</NavItem>
        <NavDropdown eventKey="4" title="Dropdown" id="nav-dropdown">
          {this.renderCategoryMenu()}
        </NavDropdown>
      </Nav>
      )
    }
  }

export default Navbar;

/*


////////////////
const Navbar = () => (
  <nav style={{ marginBottom: 0 }} className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">Comments</Link>
      </div>
      <ul className="nav navbar-nav">
        <li >
          <Link to="/categories">Categories</Link>
        </li>
        <li >
          <Link to="/sort">Sort</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
*/
