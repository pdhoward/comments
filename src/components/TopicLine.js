
/////////////////////////////////////////////////////
/////  Wrapper to Render Post and Comment   ///////
/////////////////////////////////////////////////

import React, {Component} 		from 'react';
import { connect } 						from 'react-redux';
import PropTypes 							from 'prop-types';
import API                    from '../api';
import NewComment             from './NewComment'
import PostTopic  						from './PostTopic';
import TopicCommentLine 			from './TopicCommentLine';
import PostTopicContainer   	from './PostTopicContainer';
import {Link} 							  from 'react-router-dom';
import { getCommentsForPost } from '../store/commentStore';
import {Row, Col, Button,
				SplitButton,
				MenuItem } 						from 'react-bootstrap';

class TopicLine extends Component {
	constructor(props) {
		super(props);
		this.state={
			showComponent: false
		}
		 this.handleSubmitComment = this.handleSubmitComment.bind(this);
	}

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

handleSubmitComment = (data) => {
		this.setState({showComponent: false})
		let that = this
		API.createNewComment(data).then(function(response){
					console.log("posted comment")
					that.props.dispatch(getCommentsForPost(that.props.topic))			

	})
}

handleClick = () => {
	this.setState({showComponent: true})
}

renderPost = () => {
	console.log("DEBUG Render Post")
	console.log(this.props)

	if (Array.isArray(this.props.posts)) {
			let showingPosts = this.props.posts.slice()

			return showingPosts.map(post => (
			<PostTopic key={post.id} id={post.id}
								title={post.title} body={post.body}
								author={post.author} votescore={post.voteScore}
								category={post.category}
								deleted={post.deleted} timestamp={post.timestamp} />
						))
				}
  }

	componentDidMount() {
				this.props.dispatch(getCommentsForPost(this.props.topic))
	}

	render() {
		console.log("DEBUG TOPIC LINE PROPS")
		console.log(this.props)
		return(
			<Row>
				<Col xs={0} sm={1} md={3} />

					<div className="Main">
						<PostTopicContainer>
							{this.renderPost()}
							<TopicCommentLine />
						</PostTopicContainer>
					</div>
					<div style={this.styles}>
						<Button bsStyle="primary" bsSize="large" onClick={this.handleClick}>New Comment</Button>
						{this.state.showComponent ?
							<NewComment
									postid ={this.props.topic}
									onSubmitPost={ (data) => {
										this.handleSubmitComment(data)
										}}
									/> :
						   null }
					</div>
				<Col xs={0} sm={1} md={3} />
			</Row>
		);
	}
};

TopicLine.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.object
};

TopicLine.defaultProps = {
  posts: [],
	comments: []
};

const mapStateToProps = (state, ownProps) => {

	console.log("Entered map state to props in TOPIC LINE")
  const { topic } = ownProps;
  const { sortBy, sortOrder } = state.post;
	console.log(state)
	console.log("TOPIC = " + topic)
	let posts = []

	Object.keys(state.post.posts).forEach(function(key) {
			 posts.push(state.post.posts[key])
	 });

	 if (topic) {
	 	posts = posts.filter(post => post.id === topic);
		return { posts };
	 }


	 const { comments } = state.comment.comments
   return { comments };

   const { loading, error } = state.post.posts;
   return { loading, error };
};

export default connect(mapStateToProps)(TopicLine);
