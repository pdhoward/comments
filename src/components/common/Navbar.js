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
    this.getCategories =         this.getCategories.bind(this)
	}

  getCategories = (cb) => {
    //let catarray = []
    API.getAllCategories().then(function(categories) {
      let catarray = categories.categories.map((category) => {
        return category.name
      })
      console.log("debug MENU")
      console.log(catarray)
      return cb(catarray)

    })
  }

  renderCategoryMenu = () => {
    console.log("debug RENDER MENU")
    console.log(this.state)
		return this.state.categories.map(category => (
			<MenuItem href={'/category/' + category} eventKey="4.1">{category}</MenuItem>
	   ))
   }

  componentWillMount () {
    this.getCategories((catarray) => {
      console.log("debug MOUNT")
      console.log(catarray)
      this.setState({categories: catarray})
      })
	 	}


  render() {
    return(
      <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
        <NavItem eventKey="1" href="/">Home</NavItem>
        <NavDropdown title="All Categories" id="nav-dropdown">
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
