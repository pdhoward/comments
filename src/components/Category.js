

import React, {Component} 		from 'react';
import { connect } 						from 'react-redux';
import CategoryLine						from './CategoryLine';
import PostCategoryContainer	from './PostCategoryContainer';
import { getAllPosts,
 				 sortPosts }   				from '../store/postStore';
import { Row, Col,
	 			 SplitButton,
				 MenuItem }						from 'react-bootstrap';

class Category extends Component {

	handleSelect = (e) => {
		console.log("MAIN SORT")
		console.log(e)
		switch (e) {
			case '1':
				this.props.dispatch(sortPosts('voteScore', 'asc'));
				break;
			case '2':
				this.props.dispatch(sortPosts('voteScore', 'desc'));
				break;
		 case '3':
				this.props.dispatch(sortPosts('timestamp', 'asc'));
				break;
		case '4':
				this.props.dispatch(sortPosts('timestamp', 'desc'));
				break;
		default:
				console.log('ERROR ON MAIN SORT');
	}
}

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

export default connect()(Category);
