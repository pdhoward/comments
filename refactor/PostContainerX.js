import React, {Component} 				from 'react';
import PropTypes 									from 'prop-types';
import API												from '../api'
import FakeServer 								from '../FakeServer/FakeServer';
import Post 											from './Post';
import CommentContainer 					from './CommentContainer';
import InlineCommentPrompt 				from './InlineCommentPrompt';
import PostRecommendations 				from './PostRecommendations';
import {Row, Col} 								from 'react-bootstrap';
import '../styles/PostContainer.css';

class PostContainer extends Component {

	constructor() {
		super()
		 this.state = {
			 	id: '',
 				title: '',
 				content: '',
 				recommendations: [],
				selectedText: ''
		 	}
		this.getPost = 					this.getPost.bind(this)
		this.getChildContext = 	this.getChildContext.bind(this)
		this.getPost = 					this.getPost.bind(this)
		this.getSelection = 		this.getSelection.bind(this)
		this.storePostRecommendations = this.storePostRecommendations.bind(this)
		this.inlineCommentSubmitHandler = this.inlineCommentSubmitHandler.bind(this)
		this.inlineCommentCancel = this.inlineCommentCancel.bind(this)
		this.storeCommentComponent = this.storeCommentComponent.bind(this)
		this.storeInlineCommentPrompt= this.storeInlineCommentPrompt.bind(this)
		this.storePostContainer = this.storePostContainer.bind(this)

	}

	defaultProps: {
		postContainerLeft: 0,
		postContainerTop: 0
	}

	static childContextTypes = {
		postId: PropTypes.string,
		selectedText: PropTypes.string
	}

	getPost() {
		API.getAllPosts().then((posts) => {
			this.setState({posts: posts})
		})
	}

	getChildContext() {
		return {
			postId: this.props.match.params.id,
			selectedText: this.state.selectedText
		};
	}

	/*	getSelection needs to be passed all the way down to Post.js
		why?	*/
	getSelection(){
		var selection = window.getSelection();
		var selectedText = selection.toString();
		if(selectedText.length !== 0) {
			//TODO: Be more defensive here. What if there is more than 1 range?
			//getClientRects is the de facto way to get position of a DOM node
			var range = selection.getRangeAt(0);
			var rect = range.getClientRects()[0];
			var containerRect = this.postContainer.getClientRects()[0];
			this.setState({
				selectedText: selectedText,
				//show the small hovering comment button
				showInlineComment: true,
				inlineCommentProps: {
					x: rect.right - containerRect.left + 25, //+25 is for making sure the floating button does not cover text to be commented
					y: rect.top - containerRect.top,
					domId: range.startContainer.parentElement.id //so that an inline comment can refer to its annotation in the DOM
				}
			});
		}
		else{
			this.setState({
				showInlineComment: false,
			});
		}
	}

	/*
		Should be problably using redux here instead of passing the
		below function all the way down.
	*/
	inlineCommentSubmitHandler(){
		this.commentContainer.refreshComments();
		this.setState({
			showInlineComment: false
		});
	}

	/*If the inline comment input box is canceled, we should not even
	show the inlineCommentPrompt anymore - i.e the small hovering prompt
	button too should disappear*/
	inlineCommentCancel(){
		this.setState({
			showInlineComment: false
		});
	}
	storeCommentComponent(ref){
		this.commentContainer = ref;
	}
	storeInlineCommentPrompt(ref){
		this.inlineCommentPrompt = ref;
	}

	storePostContainer(ref){
		this.postContainer = ref;
	}
	storePostRecommendations(ref){
 		this.postRecommendations = ref;
		//let postRecommendations = ref;
	}

	componentWillMount () {
		let id = this.props.match.params.id;
		API.getPost(id).then((post) => {
			this.setState(
						{ id: id,
							title: post.title,
							content: post.body,
							recommendations: [1, 2, 3] } )
					})
			}

	componentWillUpdate(nextProps, nextState){
		if(this.props.match.params.id !== nextProps.match.params.id){
			var post = this.getPost(nextProps.match.params.id);
			if (post) {
			this.setState({
				id: nextProps.match.params.id,
				title: post.title,
				content: post.content,
				recommendations: post.recommendations
					});
				} else {
			this.setState({
				id: nextProps.match.params.id,
				title: "Hello from Post Container",
				content: "Nothing to Report here today",
				recommendations: []
			});
		}
		}}

	render() {
		return(
			<Row>
				<Col xs={0} sm={1} md={3}/>
				<Col xs={12} sm={10} md={6}>
					<div className='PostContainer' ref={this.storePostContainer}>
						<Post id={this.state.id} title={this.state.title} content={this.state.content}
							handleSelection={this.getSelection}
							onClick={this.handleClick}
						/>
						{this.state.showInlineComment &&
							<InlineCommentPrompt x={this.state.inlineCommentProps.x}
								y={this.state.inlineCommentProps.y}
								domId={this.state.inlineCommentProps.domId}
								submitHandlerCallback={this.inlineCommentSubmitHandler}
								cancelCallback={this.inlineCommentCancel}
								ref={this.storeInlineCommentPrompt}
							/>
						}
						<PostRecommendations ref={this.storePostRecommendations} recommendations={this.state.recommendations} />
						<CommentContainer ref={this.storeCommentComponent} postId={this.props.match.params.id.toString()} />
					</div>
				</Col>
				<Col xs={0} sm={1} md={3} />
			</Row>
		);
	}
};

export default PostContainer;
