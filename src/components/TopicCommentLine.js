
/////////////////////////////////////////////////////
/////  Wrapper to Render Post and Comment   ///////
/////////////////////////////////////////////////

import React, {Component} 		from 'react';
import { connect } 						from 'react-redux';
import PropTypes 							from 'prop-types';
import PostTopicComments    	from './PostTopicComments';
import PostTopicContainer   	from './PostTopicContainer';
import {Row, Col, Panel} 			from 'react-bootstrap';
import { upVoteComment,
 				 downVoteComment,
			   deleteComment } 			from '../store/commentStore';

class TopicLineComments extends Component {

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
	 //
	 styles3 = {
			favoriteStyle: {
			cursor: "pointer",
			marginRight: 5,
			marginTop: 10,
			float: "left"

		},
		deleteStyle: {
			cursor: "pointer",
			marginLeft: 5,
			color: "red",
			float: "right"
		},
		clearfix: {
			clear: "both"
		}
	};


//
upVote = (id) => {
	this.props.dispatch(upVoteComment(id));
}
downVote = (id) => {
	this.props.dispatch(downVoteComment(id));
}
edit = (id) => {
	console.log("EDIT")
}
delete = (id) => {
 this.props.dispatch(deleteComment(id));
}




	renderComments = () => {
		console.log("DEBUG TOPICCommentLine RENDERCOMMENTS")
		console.log(this.props)

		if (Array.isArray(this.props.comments)) {
				let showingComments = this.props.comments.slice()

		  return showingComments.map(comment => (

				<Panel className="PostPreview" >
					<div style={this.styles3.favoriteStyle}>
					<i
						onClick={() => this.upVote(comment.id)}
						style={this.styles3.favoriteStyle}
						className={"fa fa-thumbs-o-up fa-2x"}
						aria-hidden="true"
						/>
						<i
							onClick={() => this.downVote(comment.id)}
							style={this.styles3.favoriteStyle}
							className={"fa fa-thumbs-o-down fa-2x"}
							aria-hidden="true"
							/>
						<i
							onClick={() => this.edit(comment.id)}
							style={this.styles3.favoriteStyle}
							className={"fa fa-pencil fa-2x"}
							aria-hidden="true"
						/>
					<i
						onClick={() => this.delete(comment.id)}
						style={this.styles3.deleteStyle}
						className="fa fa-trash-o fa-2x"
						aria-hidden="true"
						/>
					</div>

			 		<PostTopicComments key={comment.id} id={comment.id} body={comment.body}
				        author={comment.author} votescore={comment.voteScore} parentID={comment.parentID}
								deleted={comment.deleted} parentDeleted={comment.parentDeleted}
								timestamp={comment.timestamp} />
			</Panel>
	 ))
 }
}

	render() {
		console.log("DEBUG TOPIC LINE PROPS")
		console.log(this.props)
		return(
			<Row>
				<Col xs={0} sm={1} md={3} />

					<div className="Main">
						<PostTopicContainer>
							{this.renderComments()}
						</PostTopicContainer>
					</div>

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
