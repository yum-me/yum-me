import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import FeedPost from './FeedPost/FeedPost.jsx';
import './Feed.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: [],
      feed: [],
      posts: 0
    }
    this.fetchUserData = this.fetchUserData.bind(this);
    this.fetchUserFeed = this.fetchUserFeed.bind(this);
    this.fetchUserPosts = this.fetchUserPosts.bind(this);
  }

  componentDidMount () {
    this.fetchUserData();
    this.fetchUserFeed();
    this.fetchUserPosts();
  }

  fetchUserData () {
    axios.get('/user', {params: {username: 'ufukmehmetoglu'}})
    .then(({data}) => this.setState({userInfo: data[0]}))
    .catch(err => console.error('Error with get user info'))
  }

  fetchUserFeed () {
    axios.get('/feed', {params: {username: 'ufukmehmetoglu'}})
    .then(({data}) => this.setState({feed: data}))
    .catch(err => console.error('Error with get user info'))
  }

  fetchUserPosts () {
    axios.get('/userPosts', {params: {username: 'ufukmehmetoglu'}})
    .then(({data}) => this.setState({posts: data.length}))
    .catch(err => console.error('Error with get user info'))
  }

  render () {
    const { firstName, lastName, username, avatar, following, followers} = this.state.userInfo;
    const { feed } = this.state;
    const followingNum = following ? following.length : null;
    console.log(this.props)
    return (
      <div>
        <Navbar />
        <div className="feed-main">
          <div className="user-info">
            <div className="user-info-inner">
              <div className="feed-stripe"></div>
              <img className="avatar-photo" src={avatar} />
              <div className="feed-name">
                <h4>{firstName} {lastName}</h4>
                <p>@{username}</p>
              </div>
              <div className="feed-user-info-details">
                <p><span>{this.state.posts}</span> posts</p>
                <p><span>{followers}</span> followers</p>
                <p><span>{followingNum}</span> following</p>
              </div>
            </div>
          </div>
          <div className="feed-post-main">
            {feed.map((item, index) => <FeedPost item={item} key={index}/>)}
          </div>
        </div>
      </div>
    )
  }
}

export default Feed;