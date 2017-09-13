

import React, {Component} 		from 'react';
import sortBy                 from 'sort-by'
import API										from '../api'
import PostMain 							from './PostMain';
import PostMainContainer 			from './PostMainContainer';
import {Link} 							  from 'react-router-dom';
import {Row, Col, Button,
				SplitButton,
				MenuItem } 						from 'react-bootstrap';

class Main extends Component {

	constructor() {
		super()
		this.state = {
			posts: [],
			sortlogic: 1

		}
		this.getHomePage =    this.getHomePage.bind(this)
		this.handleSelect =   this.handleSelect.bind(this)
		this.styles = { maxWidth: '2000px',
								 		margin: '0',
										position: 'fixed',
										top: '150px',
										left: '50px' }
		this.styles2 = { maxWidth: '2000px',
										margin: '0',
										position: 'fixed',
									  top: '500px',
										left: '50px' }
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

	getHomePage() {
		API.getAllPosts().then((posts) => {
			this.setState({posts: posts})
		})

	 }
	componentWillMount () {
	 	this.getHomePage()
	 	}

	renderPosts = () => {
		console.log("DEBUG APP > MAIN SORT")
		console.log(this.props)
		let showingPosts = this.state.posts.slice()

		if (this.state.sortlogic == 1) showingPosts.sort(sortBy('voteScore'))
		if (this.state.sortlogic == 2) showingPosts.sort(sortBy('-voteScore'))
		if (this.state.sortlogic == 3) showingPosts.sort(sortBy('timestamp'))
		if (this.state.sortlogic == 4) showingPosts.sort(sortBy('-timestamp'))
		return showingPosts.map(post => (
			<PostMain key={post.id} id={post.id} title={post.title}
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

export default Main;
