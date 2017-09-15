
/////////////////////////////////////////////////////
/////  Display Posts & enable action        ///////
/////////////////////////////////////////////////

import React, {Component} 		from 'react';
import { connect } 						from 'react-redux';
import PostMain 							from './PostMain';
import PropTypes 							from 'prop-types';
import PostMainContainer 			from './PostMainContainer';
import {Link} 							  from 'react-router-dom';
import {Row, Col, Button,
				SplitButton,
				MenuItem } 						from 'react-bootstrap';

class MainLine extends Component {


		styles = { maxWidth: '2000px',
								 		margin: '0',
										position: 'fixed',
										top: '150px',
										left: '50px' }
		styles2 = { maxWidth: '2000px',
										margin: '0',
										position: 'fixed',
									  top: '500px',
										left: '50px' }



	renderPosts = () => {
		console.log("DEBUG MAINLINE")
		console.log(this.props)
		if (Array.isArray(this.props.posts)) {
				let showingPosts = this.props.posts.slice()

				return showingPosts.map(post => (

					<PostMain key={post.id} id={post.id} title={post.title}
				        author={post.author} votescore={post.voteScore} category={post.category}
								deleted={post.deleted} timestamp={post.timestamp} />
						))
					}

}

	render() {
		return(
			<Row>
				<Col xs={0} sm={1} md={3} />
				<Col xs={12} sm={10} md={6}>
					<div className="Main">

						<PostMainContainer>
							{this.renderPosts()}
						</PostMainContainer>
					</div>

				</Col>

					<div style={this.styles}>
							<Link className='newpost' to={'/newpost/'}>
								<Button bsStyle="primary" bsSize="large">New Post</Button>
							</Link>
					</div>

					<div style={this.styles2}>
						<SplitButton bsStyle={'success'} bsSize="large" title={'sort by'} key='0'
												 id={'basic-sort-dropdown'} onSelect={this.handleSelect}>
								<MenuItem eventKey="1">vote asc</MenuItem>
								<MenuItem eventKey="2">vote dec</MenuItem>
								<MenuItem eventKey="3">date asc</MenuItem>
								<MenuItem eventKey="4">date dec</MenuItem>
							</SplitButton>
					</div>


				<Col xs={0} sm={1} md={3} />
			</Row>
		);
	}
};


MainLine.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.object
};

MainLine.defaultProps = {
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

export default connect(mapStateToProps)(MainLine);
