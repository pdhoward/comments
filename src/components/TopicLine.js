
/////////////////////////////////////////////////////
/////  Wrapper to Render Post and Comment   ///////
/////////////////////////////////////////////////

import React, {Component} 		from 'react';
import { connect } 						from 'react-redux';
import PropTypes 							from 'prop-types';
import API                    from '../api';
import EditPost               from './EditPost'
import NewComment             from './NewComment'
import PostTopic  						from './PostTopic';
import TopicCommentLine 			from './TopicCommentLine';
import PostTopicContainer   	from './PostTopicContainer';
import {Link} 							  from 'react-router-dom';
import { getCommentsForPost } from '../store/commentStore';
import {Row, Col, Button,
				SplitButton,
				MenuItem, Panel } 		from 'react-bootstrap';
import { upVotePost,
 				 downVotePost,
			   deletePost,
			   getAllPosts} 				from '../store/postStore';

class TopicLine extends Component {
	constructor(props) {
		super(props);
		this.state={
			showComponent: false,
			showEdit: false
		}
		 this.handleSubmitComment = this.handleSubmitComment.bind(this);
		 this.handleUpdatePost = this.handleUpdatePost.bind(this);
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


upVote = () => {
	console.log("DEBUG UPVOTE")
	console.log(this.props)
	this.props.dispatch(upVotePost(this.props.topic));
}
downVote = () => {
	this.props.dispatch(downVotePost(this.props.topic));
}
edit = () => {
	this.setState({showEdit: true})
}
delete = () => {
 this.props.dispatch(deletePost(this.props.topic));
}
//
handleUpdatePost = (data) => {
		this.setState({showEdit: false})
		let that = this
		API.editPost(data).then(function(response){
					console.log("edit post")
					that.props.dispatch(getAllPosts())

	})
}

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

				<Panel className="PostPreview" header={post.category}>
					<div style={this.styles3.favoriteStyle}>
					<i
						onClick={() => this.upVote(this.props)}
						style={this.styles3.favoriteStyle}
						className={"fa fa-thumbs-o-up fa-2x"}
						aria-hidden="true"
						/>
						<i
							onClick={() => this.downVote(this.props)}
							style={this.styles3.favoriteStyle}
							className={"fa fa-thumbs-o-down fa-2x"}
							aria-hidden="true"
							/>
						<i
							onClick={() => this.edit(this.props)}
							style={this.styles3.favoriteStyle}
							className={"fa fa-pencil fa-2x"}
							aria-hidden="true"
						/>
					<i
						onClick={() => this.delete(this.props)}
						style={this.styles3.deleteStyle}
						className="fa fa-trash-o fa-2x"
						aria-hidden="true"
						/>
					</div>

					<PostTopic key={post.id} id={post.id}
								title={post.title} body={post.body}
								author={post.author} votescore={post.voteScore}
								category={post.category}
								deleted={post.deleted} timestamp={post.timestamp} />
				</Panel>

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

							<div>
				        {this.state.showEdit ?
				          <EditPost
				            postid ={this.props.topic}				           
				            onSubmitPost={ (data) => {
				              this.handleUpdatePost(data)
				              }}
				            /> :
				         null }
				      </div>
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
