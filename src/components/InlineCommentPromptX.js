import React, {Component}						from 'react';
import PropTypes 										from 'prop-types';
import {Button, Glyphicon} 					from 'react-bootstrap';
import InlineCommentInputContainer 	from './InlineCommentInputContainer';
import '../styles/InlineCommentPrompt.css';


class InlineCommentPrompt extends Component {
	propTypes: {
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		domId: PropTypes.string,
		submitHandlerCallback: PropTypes.func.isRequired,
		cancelCallback: PropTypes.func.isRequired
	}

	constructor() {
		super()
		 this.state = {
			 style:{
				 position: 'absolute',
				 left: this.props.x,
				 top: this.props.y,
			 },
			 prompt: true
		 };

	}


	componentDidMount () {
		let left = this.props.x;
		let top = this.props.y;
		let prompt = true;
		let position = 'absolute';
		this.setState( () => {
			return {style:{
									position: position,
									left: left,
									top: top,
								},
							prompt: prompt }
					})
			}

	handlePromptClick(){
		this.setState({
			prompt: false
		});
	}

	storeCommentInputContainer(ref){
		this.commentInputContainer = ref;
	}

	render() {
		return(
			<div className="InlineCommentPrompt" ref="child" style={this.state.style}>
				{this.state.prompt ?
					(<Button className='makeComment' bsSize='lg' >
						<Glyphicon glyph="pencil" onClick={this.handlePromptClick}/>
					</Button>)
					:
					(
						<InlineCommentInputContainer
						domId={this.props.domId}
						submitHandlerCallback={this.props.submitHandlerCallback}
						cancelCallback={this.props.cancelCallback}
						ref={this.storeCommentInputContainer}
						/>)
				}
			</div>
		);
	}
};

export default InlineCommentPrompt;
