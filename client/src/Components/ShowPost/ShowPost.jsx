import React from 'react';
import NavBar from '../Navbar/Navbar';
import PostComment from './PostComment/PostComment.jsx'
import axios from 'axios';
import './ShowPost.css';
import moment from 'moment'

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
    axios.get('http://localhost:3000/post', {params: {_id: '5d10404f189fe79e615a8886'}})
    .then(({data}) => this.setState({post: data[0]}))
    .then(() => {
      return this.state.post.comments.sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
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
    event.preventDefault()
    axios.post('http://localhost:3000/comment', {text}, {params: {_id: '5d10404f189fe79e615a8886'}})
    .then(() => this.fetchOnePost())
    .catch(() => console.error('Error with adding comment'))
    
  }
  
  handleLikePost () {
    this.setState({like: true})
    axios.post('http://localhost:3000/post', {params: {_id: '5d10404f189fe79e615a8886'}})
    .then(() => this.fetchOnePost())
    .catch(() => console.error('Error with adding comment'))
  }

  render () {
    const { author, createdAt, image, likes, recommend, restaurant, text, title } = this.state.post;
    const { comments } = this.state;
    return (
      <div> 
        <NavBar />
        <div className="show-post-main">
          <div className="show-post-user">
            <img className="show-post-avatar" src={author ? author.avatar : ''} />
            <p>{author ? author.username : ''}</p>
          </div>
          <p>Restaurant: {restaurant}</p>
          <img className="show-post-image" src={image} />
          <div className="show-post-content">
            <p>{title}</p>
            <p>{text}</p>  
          </div>
          <p>{moment(createdAt).fromNow()}</p>
          <hr / >
          <span>{comments ? comments.length : ''} comments</span>
          <button onClick={this.handleLikePost} disabled={this.state.like}> {likes} likes</button>
          <form>
            <textarea className="comment-input" name="text" placeholder="Write a comment..." onChange={this.handleChange}/>
            <button type="submit" onClick={this.handleSubmit}>Add Comment</button>
          </form>
          <div className="show-post-comments">
            {comments ? comments.map((item, index) => <PostComment item={item} key={index} />): ''}
          </div>
        </div>
      </div>
    )
  }
}

export default ShowPost;