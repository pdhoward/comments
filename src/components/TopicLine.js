
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
		console.log(this.state)
		return this.state.comments.map(comment => (
			<PostTopicComments key={this.prop.comment.id} id={this.prop.comment.id} body={this.prop.comment.body}
				        author={this.prop.comment.author} votescore={this.prop.comment.voteScore}
								parentID={this.prop.comment.parentID}
								deleted={this.prop.comment.deleted} parentDeleted={this.prop.comment.parentDeleted}
								timestamp={this.prop.comment.timestamp} />
	))
}

	render() {
		return(
			<Row>
				<Col xs={0} sm={1} md={3} />
				<Col xs={12} sm={10} md={6}>
					<div className="Main">
						<PostTopicContainer>
							<PostTopic key={this.prop.post.id} id={this.prop.post.id}
												title={this.prop.post.title} body={this.prop.post.body}
								        author={this.prop.post.author} votescore={this.prop.post.voteScore}
												category={this.prop.post.category}
												deleted={this.prop.post.deleted} timestamp={this.prop.post.timestamp} />
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
  posts: []
};

const mapStateToProps = (state, ownProps) => {
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
