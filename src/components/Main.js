

import React, {Component} 		from 'react';
import API										from '../api'
import PostMain 							from './PostMain';
import PostMainContainer 			from './PostMainContainer';
import {Row, Col} 						from 'react-bootstrap';

class Main extends Component {

	constructor() {
		super()
		this.state = {
			posts: []
		}
		this.getHomePage =    this.getHomePage.bind(this)
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
				<Col xs={0} sm={1} md={3} />
			</Row>
		);
	}
};

export default Main;
