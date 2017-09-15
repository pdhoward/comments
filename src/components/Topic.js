

import React, {Component} 			from 'react';
import { connect } 							from 'react-redux';
import TopicLine   							from './TopicLine';
import PostTopicContainer   		from './PostTopicContainer';
import { getAllPosts } 					from '../store/postStore';
import {Row, Col} 							from 'react-bootstrap';

class Topic extends Component {

	componentDidMount() {
				this.props.dispatch(getAllPosts());
	}

	render() {
		const topicid = this.props.match.params.id;
		return(
			<Row>
				<Col xs={0} sm={1} md={3} />
				<Col xs={12} sm={10} md={6}>
					<div className="Main">
						<PostTopicContainer>
							<TopicLine topic={topicid} />
						</PostTopicContainer>
					</div>
				</Col>
				<Col xs={0} sm={1} md={3} />
			</Row>
		);
	}
};

export default connect()(Topic);
