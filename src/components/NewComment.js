
import React, {Component} 					from 'react';
import PropTypes 										from 'prop-types';
import { connect } 									from 'react-redux';
import serializeForm      					from 'form-serialize'
import {
  			closeForm, submitForm,
				formChange, discardForm
			}   													from '../store/postFormStore';
import {Button, FormControl,
				FormGroup, ControlLabel,
				Col, HelpBlock, Form} 			from 'react-bootstrap';
import '../styles/CommentInput.css';

class NewComment extends Component {


		styles = { maxWidth: '500px',
							 margin: '0 auto' }

	handleSubmit = (e) => {
		console.log("ENTERED HANDLE SUBMIT")    
    console.log(this.props)
		e.preventDefault();
		const values = serializeForm(e.target, {hash: true})
		this.props.onSubmitPost(values)
	}

	handleChange = (e, { name, value }) => {
    this.props.dispatch(formChange(name, value));
  	}

	getValidationState() {
		console.log("DEBUG NEWPOST VALIDATION")
		console.log(this.props)
		if (this.props.body) {
	 		const length = this.props.body.length;
	 		if (length > 20) return 'success';
	 			else if (length > 10) return 'warning';
	 			else if (length > 0) return 'error';
 		}
 }

 	handleChange = (e) => {

    this.props.dispatch(formChange(e.target.name, e.target.value));
  }


 render() {
		 return (
			 <div style={this.styles}>
		<form onSubmit={this.handleSubmit}>
			<Form horizontal>
				<h3>Enter a New Comment</h3>

				<FormGroup controlId="formBasic" validationState={this.getValidationState()} >
		 			<Col componentClass={ControlLabel} sm={2}>
			 			Comment
		 			</Col>
		 			<Col style={{maxWidth: '500px'}} sm={10}>
						<FormControl
	 					 type="text"
						 name="body"
	 					 value={this.props.body}
	 					 placeholder="Enter Comment"
	 					 onChange={this.handleChange}
	 				 />
		 			</Col>
					<FormControl.Feedback />
					 <HelpBlock>A comment needs to be at least 20 characters</HelpBlock>
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
	 					 onChange={this.handleChange}
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

NewComment.propTypes = {
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

NewComment.defaultProps = {
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

export default connect(mapStateToProps)(NewComment);
