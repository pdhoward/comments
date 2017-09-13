

import React, {Component} 		from 'react';
import sortBy                 from 'sort-by'
import API										from '../api'
import PostCategory						from './PostCategory';
import PostCategoryContainer	from './PostCategoryContainer';
import {Row, Col,
				SplitButton,
				MenuItem} 						from 'react-bootstrap';

class Category extends Component {

	constructor() {
		super()
		this.state = {
			posts: [],
			sortlogic: 1
		}
	this.styles2 = { maxWidth: '2000px',
										margin: '0',
										position: 'fixed',
									  top: '500px',
										left: '50px' }
		this.getCategoryPosts =    this.getCategoryPosts.bind(this)
	}

	handleSelect(eventKey, event) {
		event.preventDefault();
		if (eventKey=='1') {
			this.setState({sortlogic: 1})
		}
		if (eventKey=='2') {
			this.setState({sortlogic: 2})
		}
		if (eventKey=='3') {
			this.setState({sortlogic: 3})
		}
		if (eventKey=='4') {
			this.setState({sortlogic: 4})
		}

	}

	getCategoryPosts() {
		API.getAllPosts().then((posts) => {
			let selectedCategory = posts.filter((post) => {if (post.category === this.props.match.params.category) return post})
			this.setState({posts: selectedCategory})
		})
	 }

	componentWillMount () {
	 	this.getCategoryPosts()
	 	}

	renderPosts = () => {
		let showingPosts = this.state.posts.slice()
		if (this.state.sortlogic == 1) showingPosts.sort(sortBy('voteScore'))
		if (this.state.sortlogic == 2) showingPosts.sort(sortBy('-voteScore'))
		if (this.state.sortlogic == 3) showingPosts.sort(sortBy('timestamp'))
		if (this.state.sortlogic == 4) showingPosts.sort(sortBy('-timestamp'))
		return this.showingPosts.map(post => (
			<PostCategory key={post.id} id={post.id} title={post.title}
				        author={post.author} votescore={post.voteScore} category={post.category}
								deleted={post.deleted} timestamp={post.timestamp} />
			))
		}

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

			<div style={this.styles2}>
				<SplitButton bsStyle={'success'} bsSize="large" title={'sort by'} key='0'
										 id={'basic-sort-dropdown'} onSelect={this.handleSelect}>
						<MenuItem eventKey="1">vote asc</MenuItem>
						<MenuItem eventKey="2">vote dec</MenuItem>
						<MenuItem eventKey="3">date asc</MenuItem>
						<MenuItem eventKey="4">date dec</MenuItem>
					</SplitButton>
			</div>
		</Row>
		);
	}
};

export default Category;
