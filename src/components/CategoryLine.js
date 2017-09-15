

import React, {Component} 		from 'react';
import { connect } 						from 'react-redux';
import PostCategory						from './PostCategory';
import PropTypes 							from 'prop-types';
import PostCategoryContainer	from './PostCategoryContainer';
import {Row, Col,
				SplitButton,
				MenuItem} 						from 'react-bootstrap';

class CategoryLine extends Component {

	styles2 = { maxWidth: '2000px',
							margin: '0',
							position: 'fixed',
							top: '500px',
							left: '50px' }

	renderPosts = () => {
		console.log("DEBUG CATEGORY LINE")
		console.log(this.props)
		if (Array.isArray(this.props.posts)) {
				let showingPosts = this.props.posts.slice()

				return showingPosts.filter(post => (post.category === this.props.category))
												.map(post => (
													<PostCategory key={post.id} id={post.id} title={post.title}
				        						author={post.author} votescore={post.voteScore} category={post.category}
														deleted={post.deleted} timestamp={post.timestamp} />
						))
					}
			}
//

	render() {
		return(

			<Row>
				<Col xs={0} sm={1} md={3} />
				<Col xs={12} sm={10} md={6}>
					<div className="Main">
						<PostCategoryContainer>
							{this.renderPosts()}
						</PostCategoryContainer>
					</div>
				</Col>
				<Col xs={0} sm={1} md={3} />


		</Row>
		);
	}
};

CategoryLine.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.object
};

CategoryLine.defaultProps = {
  posts: []
};

const mapStateToProps = (state, ownProps) => {
  const { category } = ownProps;
  const { sortBy, sortOrder } = state.post;
	let posts = []

	Object.keys(state.post.posts).forEach(function(key) {
			 posts.push(state.post.posts[key])
	 });

  //if (_.isString(category)) {
  //  posts = _.values(posts).filter(post => post.category === category);
  //}
	if (category) {
    posts = posts.filter(post => post.category === category);
  }

  posts = posts.sort((a, b) => {
    const temp = a[sortBy] - b[sortBy];
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return  temp * modifier;
  });


  const { loading, error } = state.post.posts;
  return { loading, error, posts };
};

export default connect(mapStateToProps)(CategoryLine);
