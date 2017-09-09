import React, {Component}						from 'react';

class PostTopicContainer extends Component {
	render() {
		return(
			<div>
			{this.props.children}
			</div>
		);
	}
};

export default PostTopicContainer;
