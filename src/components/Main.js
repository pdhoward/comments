

import React, {Component} 		from 'react';
import API										from '../api'
import PostMain 							from './PostMain';
import PostMainContainer 			from './PostMainContainer';
import {Link} 							  from 'react-router-dom';
import {Row, Col, Button} 		from 'react-bootstrap';

class Main extends Component {

	constructor() {
		super()
		this.state = {
			posts: []
		}
		this.getHomePage =    this.getHomePage.bind(this)
		this.styles = { maxWidth: '2000px',
								 		margin: '0',
										position: 'fixed',
										top: '150px',
										left: '50px' }
	}

	getHomePage() {
		API.getAllPosts().then((posts) => {
			this.setState({posts: posts})
		})

	 }
	componentWillMount () {
	 	this.getHomePage()
	 	}

	renderPosts = () => {
		return this.state.posts.map(post => (
			<PostMain key={post.id} id={post.id} title={post.title}
				        author={post.author} votescore={post.voteScore} category={post.category}
								deleted={post.deleted} timestamp={post.timestamp} />
	))
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
				</Col>

					<div style={this.styles}>
							<Link className='newpost' to={'/newpost/'}>
								<Button bsStyle="primary" bsSize="large">New Post</Button>
							</Link>
					</div>


				<Col xs={0} sm={1} md={3} />
			</Row>
		);
	}
};

export default Main;
