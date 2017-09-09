

import React, {Component} 		from 'react';
import API										from '../api'
import PostTopic  						from '../components/PostTopic';
import PostTopicContainer   	from '../components/PostTopicContainer';
import {Row, Col} 						from 'react-bootstrap';

class Topic extends Component {

	constructor() {
		super()
		this.state = {
			posts: [],
			comments: []
		}
		this.getTopicPosts =    this.getTopicPosts.bind(this)
	}

//API.getCommentsForPost = (postId)
	getTopicPosts() {
		API.getCommentsForPost(this.props.match.params.id).then((comments) => {
			console.log("GET COMMENTS")
			console.log(comments)
		})
		API.getAllPosts().then((posts) => {
			let selectedPost = posts.filter((post) => {if (post.id === this.props.match.params.id) return post})
			console.log("GET TOPIC")
			console.log(selectedPost)
			console.log(this.props)
			this.setState({posts: selectedPost})
		})

	 }
	componentWillMount () {
	 	this.getTopicPosts()
	 	}

	renderPosts = () => {
		return this.state.posts.map(post => (
			<PostTopic key={post.id} id={post.id} title={post.title}
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
						<PostTopicContainer>
							{this.renderPosts()}
						</PostTopicContainer>
					</div>
				</Col>
				<Col xs={0} sm={1} md={3} />
			</Row>
		);
	}
};

export default Topic;
