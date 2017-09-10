import React, {Component} 			from 'react';
import PropTypes 								from 'prop-types';
import {Link} 									from 'react-router-dom';
import {Panel} 									from 'react-bootstrap';
import '../styles/PostMain.css';


class PostTopic extends Component {
	propTypes: {
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		votescore: PropTypes.number.isRequired,
		timestamp: PropTypes.number.isRequired,
		id: PropTypes.number.isRequired,
		deleted: PropTypes.boolean.isRequired,
	}

	render() {
		let title = this.props.category
		return(
				<Panel className="PostPreview" header={title}>
					<h3>{this.props.title}</h3>
					<section>{this.props.body}</section>
					<section>{this.props.author}</section>
					<section>{this.props.votescore}</section>
				</Panel>

		);
	}
};

export default PostTopic;
