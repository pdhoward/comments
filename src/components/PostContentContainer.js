import React, {Component}									from 'react';
import PropTypes 													from 'prop-types';
import ReactHtmlParser 										from 'react-html-parser';
import '../styles/PostContentContainer.css';


class PostContentContainer extends Component {
	propTypes: {
		content: PropTypes.string.isRequired,
		onMouseUp: PropTypes.func
	}
	render() {
		return(
			<div className="PostContentContainer">
				<section>{ReactHtmlParser(this.props.content)}</section>
			</div>
		);
	}
};

export default PostContentContainer;
