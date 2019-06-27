import React from 'react';
import NavBar from '../Navbar/Navbar';
import PostComment from './PostComment/PostComment.jsx'
import axios from 'axios';
import './ShowPost.css';
import moment from 'moment';
import { FaCommentAlt, FaThumbsUp, FaTelegramPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class ShowPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: [],
      comments: [], 
      text: '', 
      like: false
    }
    this.fetchOnePost = this.fetchOnePost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLikePost = this.handleLikePost.bind(this);
  }

  componentDidMount () {
    this.fetchOnePost()
  }

  fetchOnePost () {
    const { id } = this.props.location;
    axios.get('/post', {params: {_id: id}})
    .then(({data}) => this.setState({post: data[0]}))
    .then(() => {
      return this.state.post.comments.sort(function(a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    })
    .then(data => this.setState({
      comments: data
    }))
    .catch(() => console.error('Error with fetching one post'))
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    const { text } = this.state;
    const { id } = this.props.location;
    event.preventDefault()
    axios.post('/comment', {text}, {params: {_id: id}})
    .then(() => this.fetchOnePost())
    .catch(() => console.error('Error with adding comment'))
    
  }
  
  handleLikePost () {
    const { id } = this.props.location;
    this.setState({like: !this.state.like}, () => {
      if(this.state.like) {
        axios.post('/post/like', {_id: id})
        .then(() => this.fetchOnePost())
        .catch(() => console.error('Error with liking post'));
      } else {
        axios.post('/post/unlike', {_id: id})
        .then(() => this.fetchOnePost())
        .catch(() => console.error('Error with unliking post'));
      }
    })
  }

  render () {
    const { username, avatar } = this.props.location;
    const { author, createdAt, image, likes, recommend, restaurant, text, title } = this.state.post;
    const { comments } = this.state;
    const commentSection = this.state.comments.length > 0 ? 
      <div className="show-post-comments">
        {comments.map((item, index) => <PostComment item={item} key={index} currentUser={username} currentAvatar={avatar}/>)}
      </div> : 
      <div className="show-post-comments-none">
        <p >No comments posted yet.</p>
      </div>
    const postAuthor = author ? author.username : null;
    const recommendImage = recommend === "Yes" ? 
      <img className="post-recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1536097829/happy_dbmo3c.png"></img> :
      <img className="post-recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1536097829/sad_fcfqhu.png"></img>
    const likeIcon = this.state.like ? <FaThumbsUp className="post-like-icon-activated" /> : <FaThumbsUp className="post-like-icon" />;
    return (
      <div> 
        <NavBar username={username} avatar={avatar}/>
        <div className="show-post-container">
          <div className="show-post-main">
            <div className="show-post-post-container">
              <img className="show-post-image" src={image} />
              <div className="show-post-content">
                <div className="show-post-title">
                  <h1>{title}</h1>
                  <div>{recommendImage}</div>                 
                </div>
                <div className="show-post-user">
                  <img className="show-post-avatar" src={author ? author.avatar : ''} />
                  <div>
                  <Link to={{pathname: `/follow/${postAuthor}`, currentUser: username, currentAvatar: avatar}} >
                    <h3>{postAuthor}</h3>
                  </Link>
                    <p>{moment(createdAt).fromNow()}</p>
                  </div>
                </div>
                <p className="show-post-text">{text}</p>  
              </div>
            </div>
            <div className="show-post-comments-container">
              <div className="show-post-comments-info">
                <p className="show-post-restaurant"><strong><span>Restaurant:</span></strong> {restaurant}</p>
                {/* <p>(Address here?)</p> */}
                <div className="post-comments-likes">
                  <p><span><FaCommentAlt className="post-comment-icon"/></span> {comments ? comments.length : ''}</p>
                  <p><span onClick={this.handleLikePost}>{likeIcon}</span> {likes}</p>
                </div>
                <form>
                  <textarea className="comment-input" name="text" placeholder="Write a comment..." onChange={this.handleChange}/>
                  <button type="submit" onClick={this.handleSubmit}><FaTelegramPlane /></button>
                </form>
              </div>
              <div className="show-post-comments">
                {commentSection}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowPost;