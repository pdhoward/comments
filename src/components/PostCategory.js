import React, {Component} 			from 'react';
import { connect } 							from 'react-redux';
import PropTypes 								from 'prop-types';
import {Link} 									from 'react-router-dom';
import {Panel} 									from 'react-bootstrap';
import API                      from '../api';
import EditPost                 from './EditPost'
import { upVotePost,
 				 downVotePost,
			   deletePost,
         getAllPosts} 				  from '../store/postStore';
import '../styles/PostMain.css';


class PostCategory extends Component {

  constructor(props) {
		super(props);
		this.state={
			showComponent: false
		}
		 this.handleUpdatePost = this.handleUpdatePost.bind(this);
	}

	styles3 = {
			favoriteStyle: {
			cursor: "pointer",
			marginRight: 5,
			marginTop: 10,
			float: "left"

		},
		deleteStyle: {
			cursor: "pointer",
			marginLeft: 5,
			color: "red",
			float: "right"
		},
		clearfix: {
			clear: "both"
		}
	};
//
handleUpdatePost = (data) => {
		this.setState({showComponent: false})
		let that = this
		API.editPost(data).then(function(response){
					console.log("edit post")
					that.props.dispatch(getAllPosts())

	})
}

			 upVote = () => {
				 console.log("DEBUG UPVOTE")
				 console.log(this.props)
				 this.props.dispatch(upVotePost(this.props.post.id));
			 }
			 downVote = () => {
				 this.props.dispatch(downVotePost(this.props.post.id));
			 }
			 edit = () => {
				 this.setState({showComponent: true})
			 }
			 delete = () => {
				this.props.dispatch(deletePost(this.props.post.id));
			 }

	render() {
		let title = this.props.category
		return(
      <div>
				<Panel className="PostPreview" header={title}>
					<div style={this.styles3.favoriteStyle}>
					<i
						onClick={() => this.upVote(this.props)}
						style={this.styles3.favoriteStyle}
						className={"fa fa-thumbs-o-up fa-2x"}
						aria-hidden="true"
						/>
						<i
							onClick={() => this.downVote(this.props)}
							style={this.styles3.favoriteStyle}
							className={"fa fa-thumbs-o-down fa-2x"}
							aria-hidden="true"
							/>						
					<i
						onClick={() => this.delete(this.props)}
						style={this.styles3.deleteStyle}
						className="fa fa-trash-o fa-2x"
						aria-hidden="true"
						/>
					</div>

				<Link className='title' to={'/category/' + this.props.category + '/' + this.props.id}>
					<div style={this.styles3.clearfix} >
						<h3>{this.props.title}</h3>
						<section>{this.props.author}</section>
						<section>{this.props.votescore}</section>
					</div>
				</Link>
			</Panel>
      <div>
        {this.state.showComponent ?
          <EditPost
            postid ={this.props.id}
            title={this.props.title}
            author={this.props.author}
            body={this.props.body}
            onSubmitPost={ (data) => {
              this.handleUpdatePost(data)
              }}
            /> :
         null }
      </div>
    </div>
		);
	}
};

PostCategory.propTypes = {
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
    id: id,
    post: state.post.posts[id],
    delete: state.post.delete,
//    isDetailView: ownProps.match.params.postId
  };
};

export default connect(mapStateToProps)(PostCategory);
