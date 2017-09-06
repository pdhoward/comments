import React, {Component} 			from 'react';
import PropTypes 								from 'prop-types';
import {Link} 									from 'react-router-dom';
import {Panel} 									from 'react-bootstrap';
import '../styles/PostPreview.css';


class PostPreview extends Component {
	propTypes: {
		title: PropTypes.string.isRequired,
		previewText: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired
	}

	render() {
		return(
			<Link className='title' to={'/posts/' + this.props.id}>
				<Panel className="PostPreview">
					<h3>{this.props.title}</h3>
					<section>{this.props.previewText}</section>
				</Panel>
			</Link>
		);
	}
};

export default PostPreview;
