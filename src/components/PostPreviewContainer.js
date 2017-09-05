import React, {Component}						from 'react';

class PostPreviewContainer extends Component {
	render() {
		return(
			<div>
			{this.props.children}
			</div>
		);
	}
};

export default PostPreviewContainer;
