
import React, {Component} 				from 'react';
import PropTypes 									from 'prop-types';
import {Button, FormControl,
				FormGroup, ControlLabel,
				HelpBlock} 								from 'react-bootstrap';
import FakeServer 								from '../FakeServer/FakeServer';
import '../styles/CommentInput.css';

class CommentInput extends Component {
	propTypes: {
		submitCallback: PropTypes.func.isRequired,
		postId: PropTypes.string.isRequired
	}

	constructor() {
		super()
		 this.state = {
				value: ''
			}
		this.handleSubmit = 					this.handleSubmit.bind(this)
		this.handleChange = 					this.handleChange.bind(this)
		this.getValidationState =   	this.getValidationState.bind(this)
	}

	getDefaultState(){
		return {
			value: ''
		};
	}
	handleSubmit(event){
		var server = new FakeServer();
		server.addPostComment(this.props.postId, this.state.value);
		this.props.submitCallback();
		this.setState(this.getDefaultState());
		event.preventDefault();
	}

	getValidationState() {
	 const length = this.state.value.length;
	 if (length > 10) return 'success';
	 else if (length > 5) return 'warning';
	 else if (length > 0) return 'error';
 }

 handleChange(e) {
	 this.setState({ value: e.target.value });
 }

 render() {
		 return (
		 <div className="CommentInput">
			 <form onSubmit={this.handleSubmit}>
				 <FormGroup
					 controlId="formBasicText"
					 validationState={this.getValidationState()}
				 >
					 <ControlLabel>Working example with validation</ControlLabel>
					 <FormControl
						 type="text"
						 value={this.state.value}
						 placeholder="Enter text"
						 onChange={this.handleChange}
					 />
					 <FormControl.Feedback />
					 <HelpBlock>Validation is based on string length.</HelpBlock>
				 </FormGroup>
				 <Button bsSize='sm' type='submit' bsStyle='primary'>Submit</Button>
			 </form>
			 </div>
		 );
	 }
};

export default CommentInput;
