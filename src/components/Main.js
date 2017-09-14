
/////////////////////////////////////////////////////
/////  Display Posts & enable action        ///////
/////////////////////////////////////////////////

import React, {Component} 		from 'react';
import { connect } 						from 'react-redux';
import { getAllPosts } 				from '../store/postStore';
import sortBy                 from 'sort-by'
import API										from '../api'
import PostMain 							from './PostMain';
import NewPost								from './NewPost';
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

	handleSelect() {
		console.log("BUTTON CLICKED")
	 }

	componentWillMount() {
     this.props.dispatch(getAllPosts());
   }

	renderPosts = () => {
		console.log("DEBUG MAIN")
		console.log(this.props)

		if (this.props.match.params.category) {
				let showingPosts = this.props.match.params.category

				return showingPosts.map(post => (
					<PostMain key={post.id} id={post.id} title={post.title}
				        author={post.author} votescore={post.voteScore} category={post.category}
								deleted={post.deleted} timestamp={post.timestamp} />
						))
					}
}

	render() {
		return(
			<Row>
				<Col xs={0} sm={1} md={3} />
				<Col xs={12} sm={10} md={6}>
					<div className="Main">

						<PostMainContainer>
							{this.renderPosts()}
						</PostMainContainer>
					</div>
						<NewPost />
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
