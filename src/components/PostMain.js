import React, {Component} 			from 'react';
import PropTypes 								from 'prop-types';
import { connect } 							from 'react-redux';
import {Link} 									from 'react-router-dom';
import {Panel} 									from 'react-bootstrap';
import '../styles/PostMain.css';


class PostMain extends Component {
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
			<Link className='title' to={'/category/' + this.props.category}>
				<Panel className="PostPreview" header={title}>
					<h3>{this.props.title}</h3>
					<section>{this.props.author}</section>
					<section>{this.props.votescore}</section>
				</Panel>
			</Link>
		);
	}
};

PostMain.propTypes = {
  id: PropTypes.string.isRequired,
  post: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
  delete: PropTypes.object,
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	votescore: PropTypes.number.isRequired,
	timestamp: PropTypes.number.isRequired,
	//id: PropTypes.number.isRequired,
	//deleted: PropTypes.boolean.isRequired,
};

PropTypes.defaultProps = {
  delete: {}
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id || ownProps.match.params.postId;
  return {
    id: '',
    post: state.post.posts[id],
    delete: state.post.delete,
    isDetailView: ownProps.match.params.postId
  };
};

export default connect(mapStateToProps)(PostMain);
