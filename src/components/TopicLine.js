
/////////////////////////////////////////////////////
/////  Wrapper to Render Post and Comment   ///////
/////////////////////////////////////////////////

import React, {Component} 		from 'react';
import { connect } 						from 'react-redux';
import PropTypes 							from 'prop-types';
import PostTopic  						from './PostTopic';
import PostTopicContainer   	from './PostTopicContainer';
import PostTopicComments    	from './PostTopicComments';
import {Row, Col} 						from 'react-bootstrap';

class TopicLine extends Component {

	renderComments = () => {
		console.log("DEBUG TOPIC COMMENTS")
		console.log(this.props)
		if (this.props.comments){
		return this.props.comments.map(comment => (
			<PostTopicComments key={this.props.comment.id} id={this.props.comment.id} body={this.props.comment.body}
				        author={this.props.comment.author} votescore={this.props.comment.voteScore}
								parentID={this.props.comment.parentID}
								deleted={this.props.comment.deleted} parentDeleted={this.props.comment.parentDeleted}
								timestamp={this.props.comment.timestamp} />
	))
}
}

renderPost = () => {
	console.log("DEBUG Render Post")
	console.log(this.props)
	if (this.props.post){
	return
		<PostTopic key={this.props.post.id} id={this.props.post.id}
							title={this.props.post.title} body={this.props.post.body}
							author={this.props.post.author} votescore={this.props.post.voteScore}
							category={this.props.post.category}
							deleted={this.props.post.deleted} timestamp={this.props.post.timestamp} />

		}
  }

	render() {
		console.log("DEBUG TOPIC LINE PROPS")
		console.log(this.props)
		return(
			<Row>
				<Col xs={0} sm={1} md={3} />
				<Col xs={12} sm={10} md={6}>
					<div className="Main">
						<PostTopicContainer>
							{this.renderPost()}
							{this.renderComments()}
						</PostTopicContainer>
					</div>
				</Col>
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
	console.log(state)
  const { category } = ownProps;
  const { sortBy, sortOrder } = state.post;
	let posts = []

	Object.keys(state.post.posts).forEach(function(key) {
			 posts.push(state.post.posts[key])
	 });

	 const { post } = state.post
   return { post };

	 const { comments } = state.comments
   return { comments };

  //if (_.isString(category)) {
  //  posts = _.values(posts).filter(post => post.category === category);
  //}
	if (category) {
    posts = posts.filter(post => post.category === category);
  }

  posts = posts.sort((a, b) => {
    const temp = a[sortBy] - b[sortBy];
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return  temp * modifier;
  });

  const { loading, error } = state.post.posts;
  return { loading, error, posts };
};

export default connect(mapStateToProps)(TopicLine);
