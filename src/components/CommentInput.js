
import React, {Component} 				from 'react';
import PropTypes 									from 'prop-types';
import {Button, FormControl} 			from 'react-bootstrap';
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
	handleChange(event){
		this.setState({value: event.target.value});
	}
	render() {
		return(
			<div className="CommentInput">
				<form onSubmit={this.handleSubmit}>
					<FormControl
						componentClass="textarea"
						onChange={this.handleChange}
						placeholder="Let us know what you think"
						value={this.state.value}
					/>
					<Button bsSize='sm' type='submit' bsStyle='primary'>Submit</Button>
				</form>
			</div>
		);
	}
};

export default CommentInput;
