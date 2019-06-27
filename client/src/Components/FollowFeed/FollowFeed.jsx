import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import FollowPost from './FollowPost/FollowPost.jsx';
import './FollowFeed.css';
import axios from 'axios';

class FollowFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: [],
      feed: [],
      posts: 0,
      followStatus: true
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
    axios.post('http://localhost:3000/user/follow', {followUser: 'kathog'}, {params: {username: 'ufukmehmetoglu'}})
    .then(() => this.setState({followStatus: true}))
    .then(() => this.fetchUserData())
    .catch(() => console.error('Error with followUser'))
  }

  handleUnfollowUser () {
    axios.post('http://localhost:3000/user/unfollow', {followUser: 'kathog'}, {params: {username: 'ufukmehmetoglu'}})
    .then(() => this.setState({followStatus: false}))
    .then(() => this.fetchUserData())
    .catch(() => console.error('Error with followUser'))
  }

  handleCheckFollow () {
    axios.get('http://localhost:3000/user/follow',{params: {username: 'ufukmehmetoglu', followUser: 'kathog'}})
    // .then(({data}) => console.log(data)) 
    .then(({data}) => this.setState({followStatus: data}))
    .catch(err => console.error('Error with handleCheckFollow'))
  }

  render () {
    const { firstName, lastName, username, avatar, following, followers, location } = this.state.userInfo;
    const { feed } = this.state;
    const followingNum = following ? following.length : null;
    const { followStatus } = this.state;
    console.log('props', this.props)
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
                <p>{location}</p>
              </div>
              <div className="feed-user-info-details">
                <p><span>{this.state.posts}</span> posts</p>
                <p><span>{followers}</span> followers</p>
                <p><span>{followingNum}</span> following</p>
                {followStatus ? <button onClick={this.handleUnfollowUser}>Unfollow</button> : <button onClick={this.handleFollowUser}>Follow</button>}
                {/* <button onClick={this.handleUnfollowUser}>Unfollow</button> */}
              </div>
            </div>
          </div>
          <div className="feed-post-main">
            {feed.map((item, index) => <FollowPost item={item} key={index}/>)}
          </div>
        </div>
      </div>
    )
  }
}

export default FollowFeed;