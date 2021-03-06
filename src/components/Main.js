
/////////////////////////////////////////////////////
/////  Wrapper component for Mainline      ///////
/////////////////////////////////////////////////

import React, {Component} 		from 'react';
import { connect } 						from 'react-redux';
import {Link} 							  from 'react-router-dom';
import {Row, Col, Button,
				SplitButton,
				MenuItem } 						from 'react-bootstrap';
import PostMainContainer 			from './PostMainContainer';
import { getAllPosts,
 				 sortPosts  } 				from '../store/postStore';
import MainLine 							from './MainLine';


class Main extends Component {

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

	//sortBy: ['voteScore', 'timestamp'][0],
	//sortOrder: ['asc', 'desc'][1],
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

		return(
			<Row>
				<Col xs={0} sm={1} md={3} />
				<Col xs={12} sm={10} md={6}>
					<div className="Main">

						<PostMainContainer>
							<MainLine />
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

export default connect()(Main);
