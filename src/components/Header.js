

import React            from 'react';
import {Row, Col}       from 'react-bootstrap';
import '../styles/Header.css';

var Header = React.createClass({
  render() {
    return(
		<div className='Header'>
			<Row>
				<Col xs={0} sm={1} md={3} />				
				<Col xs={0} sm={0} md={3} />
				<Col xs={0} sm={1} md={3} />
			</Row>
		      {this.props.children}
		</div>
    );
  }
});

export default Header;
