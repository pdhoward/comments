import React, {Component} 			from 'react';
import PropTypes 								from 'prop-types';
import {Link} 									from 'react-router-dom';
import {Panel} 									from 'react-bootstrap';
import '../styles/PostMain.css';


class PostTopicComments extends Component {
	propTypes: {
		body: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		parentID: PropTypes.string.isRequired,
		votescore: PropTypes.number.isRequired,
		timestamp: PropTypes.number.isRequired,
		id: PropTypes.number.isRequired,
		deleted: PropTypes.boolean.isRequired,
		parentDeleted: PropTypes.boolean.isRequired
	}

	render() {

		return(
				<Panel className="PostPreview" >
					<section>{this.props.body}</section>
					<section>{this.props.author}</section>
					<section>{this.props.votescore}</section>
				</Panel>

		);
	}
};

export default PostTopicComments;
