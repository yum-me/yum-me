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
    axios.get('/user', {params: {username: 'kathog'}})
    .then(({data}) => this.setState({userInfo: data[0]}))
    .catch(err => console.error('Error with get user info'))
  }

  fetchUserFeed () {
    axios.get('/userPosts', {params: {username: 'kathog'}})
    .then(({data}) => this.setState({feed: data}))
    .catch(err => console.error('Error with get user info'))
  }

  fetchUserPosts () {
    axios.get('/userPosts', {params: {username: 'kathog'}})
    .then(({data}) => this.setState({posts: data.length}))
    .catch(err => console.error('Error with get user info'))
  }

  handleFollowUser () {
    // axios.post('/user/follow', {followUser: 'kathog'}, {params: {username: 'ufukmehmetoglu'}})
    axios.post('/user/follow', {followUser: 'kathog', username: 'ufukmehmetoglu'})
    .then(() => this.setState({followStatus: true}, this.fetchUserData()))
    .catch(() => console.error('Error with followUser'))
  }

  handleUnfollowUser () {
    // axios.post('/user/unfollow', {followUser: 'kathog'}, {params: {username: 'ufukmehmetoglu'}})
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
    const followBtn = followStatus ? 
      <button onClick={this.handleUnfollowUser}>unfollow</button> : 
      <button onClick={this.handleFollowUser}>follow</button>

    return(
      <div>
        <Navbar />
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
          <div className="two-col-grid">
            {feed.map((item, index) => <div className="grid-item hvr-grow"><FollowPost item={item} key={index}/></div>)}
          </div>
        </div>
      </div>
    );
    // return (
    //   <div>
    //     <Navbar />
    //     <div className="user-user-main">
    //       <div className="user-user-info">
    //         <div className="user-user-info-inner">
    //           <div className="user-feed-stripe"></div>
    //           <img className="user-avatar-photo" src={avatar} />
    //           <div className="user-feed-name">
    //             <h4>{firstName} {lastName}</h4>
    //             <p>@{username}</p>
    //             <p>{location}</p>
    //           </div>
    //           <div className="feed-user-info-details">
    //             <p><span>{this.state.posts}</span> posts</p>
    //             <p><span>{followers}</span> followers</p>
    //             <p><span>{followingNum}</span> following</p>
    //             {followStatus ? <button onClick={this.handleUnfollowUser}>Unfollow</button> : <button onClick={this.handleFollowUser}>Follow</button>}
    //             {/* <button onClick={this.handleUnfollowUser}>Unfollow</button> */}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="user-post-main">
    //         {feed.map((item, index) => <FollowPost item={item} key={index}/>)}
    //       </div>
    //     </div>
    //   </div>
    // )
  }
}

export default FollowFeed;