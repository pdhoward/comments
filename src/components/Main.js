
/////////////////////////////////////////////////////
/////  Wrapper component for Mainline      ///////
/////////////////////////////////////////////////

import React, {Component} 		from 'react';
import { connect } 						from 'react-redux';
import { getAllPosts } 				from '../store/postStore';
import MainLine 							from './MainLine';
import _ from 'lodash';
import PropTypes 							from 'prop-types';
import PostMainContainer 			from './PostMainContainer';
import {Link} 							  from 'react-router-dom';
import {Row, Col, Button,
				SplitButton,
				MenuItem } 						from 'react-bootstrap';

class Main extends Component {

		styles = { maxWidth: '2000px',
								 		margin: '0',
										position: 'fixed',
										top: '150px',
										left: '50px' }
		styles2 = { maxWidth: '2000px',
										margin: '0',
										position: 'fixed',
									  top: '500px',
										left: '50px' }


	componentWillMount() {
		console.log("DEBUG MAIN - entered component will mount")
     this.props.dispatch(getAllPosts());
   }

	render() {
		console.log("DEBUG MAIN")
		console.log(this.props)
	 const category = _.get(this.props, 'match.params.category', null);
		let category2 = this.props.match.params.category
		return(
			<Row>
				<Col xs={0} sm={1} md={3} />
				<Col xs={12} sm={10} md={6}>
					<div className="Main">

						<PostMainContainer>
							<MainLine category = {category}/>
						</PostMainContainer>
					</div>
				</Col>

					<div style={this.styles}>
							<Link className='newpost' to={'/newpost/'}>
								<Button bsStyle="primary" bsSize="large">New Post</Button>
							</Link>
					</div>

					<div style={this.styles2}>
						<SplitButton bsStyle={'success'} bsSize="large" title={'sort by'} key='0'
												 id={'basic-sort-dropdown'} onSelect={this.handleSelect}>
								<MenuItem eventKey="1">vote asc</MenuItem>
								<MenuItem eventKey="2">vote dec</MenuItem>
								<MenuItem eventKey="3">date asc</MenuItem>
								<MenuItem eventKey="4">date dec</MenuItem>
							</SplitButton>
					</div>


				<Col xs={0} sm={1} md={3} />
			</Row>
		);
	}
};



export default connect()(Main);
