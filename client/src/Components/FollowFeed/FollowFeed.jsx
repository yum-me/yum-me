import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import FollowPost from './FollowPost/FollowPost.jsx';
import './FollowFeed.css';
import axios from 'axios';
import { MdLocationOn } from 'react-icons/md';

class FollowFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: [],
      feed: [],
      posts: 0,
      followStatus: false
    }
    this.fetchUserData = this.fetchUserData.bind(this);
    this.fetchUserFeed = this.fetchUserFeed.bind(this);
    this.fetchUserPosts = this.fetchUserPosts.bind(this);
    this.handleFollowUser = this.handleFollowUser.bind(this);
    this.handleUnfollowUser = this.handleUnfollowUser.bind(this);
    this.handleCheckFollow = this.handleCheckFollow.bind(this);
  }

  componentDidMount () {
    this.fetchUserData(); 
    this.fetchUserFeed();
    this.fetchUserPosts();
    this.handleCheckFollow();
  }

  fetchUserData () {
    const { username } = this.props.match.params;
    axios.get('/user', {params: {username}})
    .then(({data}) => this.setState({userInfo: data[0]}))
    .catch(err => console.error('Error with get user info'))
  }

  fetchUserFeed () {
    const { username } = this.props.match.params;
    axios.get('/userPosts', {params: {username}})
    .then(({data}) => this.setState({feed: data}))
    .catch(err => console.error('Error with get user info'))
  }

  fetchUserPosts () {
    const { username } = this.props.match.params;
    axios.get('/userPosts', {params: {username}})
    .then(({data}) => this.setState({posts: data.length}))
    .catch(err => console.error('Error with get user info'))
  }

  handleFollowUser () {
    axios.post('/user/follow', {followUser: 'kathog', username: 'ufukmehmetoglu'})
    .then(() => this.setState({followStatus: true}, this.fetchUserData()))
    .catch(() => console.error('Error with followUser'))
  }

  handleUnfollowUser () {
    axios.post('/user/unfollow', {followUser: 'kathog', username: 'ufukmehmetoglu'})
    .then(() => this.setState({followStatus: false}, this.fetchUserData()))
    .catch(() => console.error('Error with followUser'))
  }

  handleCheckFollow () {
    axios.get('/user/follow',{params: {username: 'ufukmehmetoglu', followUser: 'kathog'}})
    .then(({data}) => this.setState({followStatus: data}))
    .catch(err => console.error('Error with handleCheckFollow'))
  }

  render () {
    const { firstName, lastName, username, avatar, following, followers, location } = this.state.userInfo;
    const { feed } = this.state;
    const followingNum = following ? following.length : null;
    const { followStatus } = this.state;
    const { currentUser, currentAvatar } = this.props.location;
    const followBtn = followStatus ? 
      <button onClick={this.handleUnfollowUser}>unfollow</button> : 
      <button onClick={this.handleFollowUser}>follow</button>
    const userPostSection = this.state.feed.length > 0 ? 
      <div className="two-col-grid">
        {feed.map((item, index) => <div className="grid-item hvr-grow"><FollowPost item={item} key={index} username={currentUser} avatar={currentAvatar}/></div>)}
      </div> : 
      <div className="user-no-posts">
        <h3>It looks like this user hasn't posted anything yet.</h3>
        <div>
          <p>Bummer!</p>
          <img src="https://res.cloudinary.com/kjhogan/image/upload/v1536097829/terrible_ufki2y.png"></img>
        </div>
      </div>

    return(
      <div>
        <Navbar username={username} avatar={avatar}/>
        <div className="user-user-info-container">
          <img className="user-avatar-photo" src={avatar} />
          <div className="user-user-info">
            <div className="user-user-name">
              <h1>{firstName} {lastName}</h1>
              {followBtn}
            </div>
            <h2>@{username}</h2>
            <div>
              <p className="user-user-location"><span><MdLocationOn /></span>{location}</p>
            </div>
            <div className="user-user-info-details">
              <p><span>{this.state.posts}</span> posts</p>
              <p><span>{followers}</span> followers</p>
              <p><span>{followingNum}</span> following</p>
            </div>
          </div>
        </div>
        <div className="user-user-posts-container">
          {userPostSection}
        </div>
      </div>
    );
  }
}

export default FollowFeed;