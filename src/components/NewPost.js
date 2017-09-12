
import React, {Component} 				from 'react';
import PropTypes 									from 'prop-types';
import serializeForm      				from 'form-serialize'
import {Button, FormControl,
				FormGroup, ControlLabel,
				Col,
				HelpBlock, Form} 					from 'react-bootstrap';
import API												from '../api'
import FakeServer 								from '../FakeServer/FakeServer';
import '../styles/CommentInput.css';

class NewPost extends Component {
	propTypes: {
		onSubmitPost: PropTypes.func.isRequired
	}

	constructor() {
		super()
		 this.state = {
				post: '',
				author: '',
				title: '',
				category: ''
			}

		this.styles = { maxWidth: '500px',
								 		margin: '0 auto' }

		this.handleSubmit = 					this.handleSubmit.bind(this)
		this.handleChangePost = 			this.handleChangePost.bind(this)
		this.handleChangeAuthor = 		this.handleChangeAuthor.bind(this)
		this.handleChangeTitle = 		  this.handleChangeTitle.bind(this)
		this.getValidationState =   	this.getValidationState.bind(this)
	}


	handleSubmit(e) {
		event.preventDefault();
		const values = serializeForm(e.target, {hash: true})
			if (this.props.onCreateContact)
			this.props.onCreateContact(values)
		}			

	getValidationState() {
	 const length = this.state.post.length;
	 if (length > 20) return 'success';
	 else if (length > 10) return 'warning';
	 else if (length > 0) return 'error';
 }

 handleChangeCategory(e) {
 	this.setState({ category: e.target.value });
 }

 handleChangeTitle(e) {
 	this.setState({ title: e.target.value });
 }

 handleChangePost(e) {
	 this.setState({ post: e.target.value });
 }
 handleChangeAuthor(e) {
	 this.setState({ author: e.target.value });
 }


 render() {
		 return (
			 <div style={this.styles}>
		<form onSubmit={this.handleSubmit()}>
			<Form horizontal>
				<h1>Enter a New Post</h1>

					<FormGroup controlId="formBasic">
			 			<Col componentClass={ControlLabel} sm={2}>
				 			Category
			 			</Col>
			 			<Col style={{maxWidth: '500px'}} sm={10}>
							<FormControl
		 					 type="text"
		 					 value={this.state.category}
		 					 placeholder="Select Category"
		 					 onChange={this.handleChangeCategory}
		 				 />
			 			</Col>
		 			</FormGroup>

				<FormGroup controlId="formBasic">
		 			<Col componentClass={ControlLabel} sm={2}>
			 			Title
		 			</Col>
		 			<Col style={{maxWidth: '500px'}} sm={10}>
						<FormControl
	 					 type="text"
	 					 value={this.state.title}
	 					 placeholder="Enter Post Title"
	 					 onChange={this.handleChangeTitle}
	 				 />
		 			</Col>
	 			</FormGroup>

				<FormGroup controlId="formBasic" validationState={this.getValidationState()} >
		 			<Col componentClass={ControlLabel} sm={2}>
			 			Content
		 			</Col>
		 			<Col style={{maxWidth: '500px'}} sm={10}>
						<FormControl
	 					 type="text"
	 					 value={this.state.Post}
	 					 placeholder="Enter Post Content"
	 					 onChange={this.handleChangePost}
	 				 />
		 			</Col>
					<FormControl.Feedback />
					 <HelpBlock>A post needs to be at least 20 characters</HelpBlock>
	 			</FormGroup>

				<FormGroup controlId="formBasic">
		 			<Col componentClass={ControlLabel} sm={2}>
			 			Author
		 			</Col>
		 			<Col style={{maxWidth: '500px'}} sm={10}>
						<FormControl
	 					 type="text"
	 					 value={this.state.author}
	 					 placeholder="Enter Author Name"
	 					 onChange={this.handleChangeAuthor}
	 				 />
		 			</Col>
	 			</FormGroup>

					<Button bsSize='sm' type='submit' bsStyle='primary'>Submit</Button>

		 		</Form>
	 		</form>
		 </div>
		);
	}
};

export default NewPost;
