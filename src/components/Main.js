

import React, {Component} 		from 'react';
import API										from '../api'
import FakeServer 						from '../FakeServer/FakeServer';
import PostPreview 						from '../components/PostPreview';
import PostPreviewContainer 	from '../components/PostPreviewContainer';
import {Row, Col} 						from 'react-bootstrap';

class Main extends Component {
	getHomePage() {
		//var server = new FakeServer();
		//return server.getHomePageContent();
		//return API.getAllPosts()
		let data = API.getAllPosts()
		console.log(data)
		return [{
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  }]
	 }

	render() {
		return(
			<Row>
				<Col xs={0} sm={1} md={3} />
				<Col xs={12} sm={10} md={6}>
					<div className="Main">
						<PostPreviewContainer>
							{this.getHomePage().map(function(post){
								return <PostPreview key={post.id} id={post.id} title={post.title} previewText={post.body} />;
							})}
						</PostPreviewContainer>
					</div>
				</Col>
				<Col xs={0} sm={1} md={3} />
			</Row>
		);
	}
};

export default Main;
