

import React, {Component} 		from 'react';
import API										from '../api'
import PostCategory						from '../components/PostCategory';
import PostCategoryContainer	from '../components/PostCategoryContainer';
import {Row, Col} 						from 'react-bootstrap';

class Category extends Component {

	constructor() {
		super()
		this.state = {
			posts: []
		}
		this.getCategoryPosts =    this.getCategoryPosts.bind(this)
	}

	getCategoryPosts() {
		API.getAllPosts().then((posts) => {
			let selectedCategory = posts.filter((post) => {if (post.category === this.props.match.category) return post})
			this.setState({posts: selectedCategory})
		})

	 }
	componentWillMount () {
	 	this.getCategoryPosts()
	 	}

	renderPosts = () => {
		return this.state.posts.map(post => (
			<PostCategory key={post.id} id={post.id} title={post.title}
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
						<PostCategoryContainer>
							{this.renderPosts()}
						</PostCategoryContainer>
					</div>
				</Col>
				<Col xs={0} sm={1} md={3} />
			</Row>
		);
	}
};

export default Category;
