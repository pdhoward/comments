import React, {Component}						from 'react';

class PostCategoryContainer extends Component {
	render() {
		return(
			<div>
			{this.props.children}
			</div>
		);
	}
};

export default PostCategoryContainer;
