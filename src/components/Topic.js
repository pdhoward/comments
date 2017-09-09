

import React, {Component} 		from 'react';
import API										from '../api'
import PostTopic  						from '../components/PostTopic';
import PostTopicContainer   	from '../components/PostTopicContainer';
import {Row, Col} 						from 'react-bootstrap';

class Topic extends Component {

	constructor() {
		super()
		this.state = {
			posts: []
		}
		this.getTopicPosts =    this.getTopicPosts.bind(this)
	}

	getTopicPosts() {
		API.getAllPosts().then((posts) => {
			let selectedCategory = posts.filter((post) => {if (post.category === this.props.match.params.category) return post})
			console.log(selectedCategory)
			console.log(this.props.match.params.category)
			console.log(this.props)
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

export default Topic;