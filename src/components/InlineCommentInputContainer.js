
import React, {Component} 						from 'react';
import PropTypes 											from 'prop-types';
import {Button, Panel, FormControl} 	from 'react-bootstrap';
import FakeServer 										from '../FakeServer/FakeServer';
import '../styles/InlineCommentInputContainer.css';


class InlineCommentInputContainer extends Component {
	propTypes: {
		submitHandlerCallback: PropTypes.func.isRequired,
		cancelCallback: PropTypes.func.isRequired,
		domId: PropTypes.string
	}
	contextTypes: {
		postId: PropTypes.string,
		selectedText: PropTypes.string
	}
	constructor() {
		super()
		 this.state = {
			 	value: ''
		 	}

	}

	getDefaultState(){
		return {
			value: ''
		};
	}
	submitHandler(event){
		var server = new FakeServer();
		server.addPostComment(this.context.postId, this.state.value, this.context.selectedText, this.props.domId);
		this.props.submitHandlerCallback();
		this.setState(this.getDefaultState());
		event.preventDefault();
	}
	handleChange(event){
		this.setState({value: event.target.value});
	}
	handleCancel(){
		this.props.cancelCallback();
	}
	render() {
		return(
			<Panel className="InlineCommentInputContainer">
				<Panel className="annotation">
					<span>{this.context.selectedText}</span>
				</Panel>
				<form onSubmit={this.submitHandler}>
					<FormControl
						componentClass="textarea"
						onChange={this.handleChange}
						placeholder="Let us know what you think"
					/>
					<Button bsSize='sm' bsStyle='success' type='submit'>Submit</Button>
					<Button bsSize='sm' bsStyle='danger' onClick={this.handleCancel}>cancel</Button>
				</form>
			</Panel>
		);
	}
};

export default InlineCommentInputContainer;
