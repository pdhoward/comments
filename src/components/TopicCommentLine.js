
/////////////////////////////////////////////////////
/////  Wrapper to Render Post and Comment   ///////
/////////////////////////////////////////////////

import React, {Component} 		from 'react';
import { connect } 						from 'react-redux';
import PropTypes 							from 'prop-types';
import PostTopicComments    	from './PostTopicComments';
import {Row, Col} 						from 'react-bootstrap';

class TopicLineComments extends Component {

	renderComments = () => {
		console.log("DEBUG TOPICCommentLine RENDERCOMMENTS")
		console.log(this.props)

		if (Array.isArray(this.props.comments)) {
				let showingComments = this.props.comments.slice()

		  return showingComments.map(comment => (

			 <PostTopicComments key={comment.id} id={comment.id} body={comment.body}
				        author={comment.author} votescore={comment.voteScore} parentID={comment.parentID}
								deleted={comment.deleted} parentDeleted={comment.parentDeleted}
								timestamp={comment.timestamp} />
	 ))
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
							{this.renderComments()}
					</div>
				</Col>
				<Col xs={0} sm={1} md={3} />
			</Row>
		);
	}
};

TopicLineComments.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.object
};

TopicLineComments.defaultProps = {
  posts: [],
	comments: []
};

const mapStateToProps = (state, ownProps) => {

	console.log("Entered map state to props in TOPICCOMMENTLINE")
  const { topic } = ownProps;
  const { sortBy, sortOrder } = state.post;
	console.log(state)
	let comments = []

	Object.keys(state.comment.comments).forEach(function(key) {
			 comments.push(state.comment.comments[key])
	 });

   return { comments };

   const { loading, error } = state.post.posts;
   return { loading, error };
};

export default connect(mapStateToProps)(TopicLineComments);
