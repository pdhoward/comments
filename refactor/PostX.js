import React, {Component}   from 'react';
import PropTypes 					 	from 'prop-types';
import PostContentContainer from './PostContentContainer';

class Post extends Component {
	propTypes: {
		title: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		handleSelection: PropTypes.func
	}
	render() {
		return(
			<div className="Post">
				<h2 className="title">{this.props.title}</h2>
				<div onMouseUp={this.props.handleSelection}>
					<PostContentContainer content={this.props.content} />
				</div>
			</div>
		);
	}
};

export default Post;
