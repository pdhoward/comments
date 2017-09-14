
import React, {Component} 					from 'react';
import PropTypes 										from 'prop-types';
import { connect } 									from 'react-redux';
import serializeForm      					from 'form-serialize'
import {Button, FormControl,
				FormGroup, ControlLabel,
				Col, HelpBlock, Form} 			from 'react-bootstrap';
import '../styles/CommentInput.css';

class NewPost extends Component {

		styles = { maxWidth: '500px',
							 margin: '0 auto' }

	handleSubmit(e) {
		e.preventDefault();
		const values = serializeForm(e.target, {hash: true})

		if (this.props.onSubmitPost)
				this.props.onSubmitPost(values)
		}

	getValidationState() {
		console.log("DEBUG NEWPOST")
		console.log(this.props)
		if (this.props.post) {
	 		const length = this.props.post.length;
	 		if (length > 20) return 'success';
	 			else if (length > 10) return 'warning';
	 			else if (length > 0) return 'error';
 		}
 }

// to do - validation routine dynamically tied to categories registered to server
 getValidationCat() {
	const entry = this.props.category;
	if (entry === 'redux' || entry === 'react' || entry === 'udacity') return 'success';

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
		<form onSubmit={this.handleSubmit}>
			<Form horizontal>
				<h1>Enter a New Post</h1>

					<FormGroup controlId="formBasic" validationState={this.getValidationCat()}>
			 			<Col componentClass={ControlLabel} sm={2}>
				 			Category
			 			</Col>
			 			<Col style={{maxWidth: '500px'}} sm={10}>
							<FormControl
							 type="text"
							 name="category"
							 placeholder="Enter Category"
							 value={this.props.category}
							 onChange={this.handleChangeCategory}
							 />
			 			</Col>
						<FormControl.Feedback />
						 <HelpBlock>Valid categories react, redux, udacity</HelpBlock>
		 			</FormGroup>

				<FormGroup controlId="formBasic">
		 			<Col componentClass={ControlLabel} sm={2}>
			 			Title
		 			</Col>
		 			<Col style={{maxWidth: '500px'}} sm={10}>
						<FormControl
	 					 type="text"
						 name="title"
	 					 value={this.props.title}
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
						 name="body"
	 					 value={this.props.post}
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
						 name="author"
	 					 value={this.props.author}
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

NewPost.propTypes = {
  submitDisabled: PropTypes.bool,
  visible: PropTypes.bool,
  submitting: PropTypes.bool,
  submitError: PropTypes.object,
  categories: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  formType: PropTypes.oneOf(['new', 'edit'])
};

NewPost.defaultProps = {
  submitDisabled: true,
  visible: false,
  submitting: false,
  submitError: null,
  categories: [],
  formType: 'new'
};

const mapStateToProps = (state, ownProps) => {
  const { visible, submitting, submitError, formType, postData } = state.postForm;
  const { categories } = state.category;
  const requiredFields = ['title', 'body'];
  if (formType === 'new') {
    requiredFields.push('author', 'category');
  }
  const submitDisabled = requiredFields.some(field => {
    const value = postData[field];
  //  return !(_.isString(value) && _.trim(value).length > 0);
  });

  return {
    formType,
    submitDisabled,
    visible,
    submitting,
    submitError,
    ...postData,
    categories
  };
};

export default connect(mapStateToProps)(NewPost);
