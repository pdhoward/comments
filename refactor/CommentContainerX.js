

import React, {Component} 			from 'react';
import PropTypes 								from 'prop-types';
import FakeServer 							from '../FakeServer/FakeServer';
import CommentInput 						from './CommentInput';
import Comment 									from './Comment';


class CommentContainer extends Component {
	propTypes: {
		postId: PropTypes.string.isRequired
	}

	constructor() {
		super()
		 this.state = {
			 	comments: []
		 	}
			this.getPostComments = 					this.getPostComments.bind(this)
			this.refreshComments = 					this.refreshComments.bind(this)
			this.handleAnnotationClick = 		this.handleAnnotationClick.bind(this)
		}

	componentDidMount(){
		console.log("COMMENT CONTAINER MOUNTED")
		console.log(this.props)
		var comments = this.getPostComments(this.props.postId);
		this.setState({
			comments: comments
		});
	}
	getPostComments(postId) {
		var server = new FakeServer();
		return server.getPostComments(postId);
	}
	refreshComments() {
		var server = new FakeServer();
		var comments = server.getPostComments(this.props.postId);
		this.setState({
			comments: comments
		});
	}
	handleAnnotationClick(id){
		var domElement = document.getElementById(id);
		//This will mess up the react-router hash history and throw a warning in the console
		//But its easier than manually scrolling to the right element. :D
		//location.href='#' + id;
		domElement.className += ' blink';
		domElement.addEventListener('animationend', function(){
			this.classList.remove('blink');
		});
	}

	/*There must be a better way of checking for prop changes and re-rendering*/
	componentWillUpdate(nextProps){
		if(this.props.postId !== nextProps.postId){
			this.setState({
				comments: this.getPostComments(nextProps.postId)
			});
		}
	}

	render() {
		var self = this;
		return(
			<div className="CommentContainer">
				<CommentInput postId={this.props.postId} submitCallback={this.refreshComments}/>
				{this.state.comments.map(function(comment){
					return (<Comment key={comment.id} content={comment.content}
							annotation={comment.annotation}
							domId={comment.domId}
							handleAnnotationClick={self.handleAnnotationClick}
							/>);
				})}
			</div>
		);
	}
};

export default CommentContainer;
