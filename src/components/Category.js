

import React, {Component} 		from 'react';
import { connect } 						from 'react-redux';
import API										from '../api'
import CategoryLine						from './CategoryLine';
import PostCategoryContainer	from './PostCategoryContainer';
import { getAllPosts }   			from '../store/postStore';
import {Row, Col,
				SplitButton,
				MenuItem} 						from 'react-bootstrap';
import _ from 'lodash';

class Category extends Component {

	 componentDidMount() {
	 			this.props.dispatch(getAllPosts());
	 }

	render() {
		const category = this.props.match.params.category;
		return(
			<Row>
				<Col xs={0} sm={1} md={3} />
				<Col xs={12} sm={10} md={6}>
					<div className="Main">
						<PostCategoryContainer>
							<CategoryLine category={category} />
						</PostCategoryContainer>
					</div>
				</Col>
				<Col xs={0} sm={1} md={3} />
			</Row>
		);
	}
};

export default connect()(Category);
