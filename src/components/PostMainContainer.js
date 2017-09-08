import React, {Component}						from 'react';

class PostMainContainer extends Component {
	render() {
		return(
			<div>
			{this.props.children}
			</div>
		);
	}
};

export default PostMainContainer;
