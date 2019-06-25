import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import FeedPosts from './FeedPost/FeedPost.jsx';
import './Feed.css';
import axios from 'axios';

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: [],
      feed: []
    }
    this.fetchUserData = this.fetchUserData.bind(this);
    this.fetchUserFeed = this.fetchUserFeed.bind(this);
  }

  componentDidMount () {
    this.fetchUserData()
    this.fetchUserFeed()
  }

  fetchUserData () {
    axios.get('http://localhost:3000/user', {params: {username: 'ufukmehmetoglu'}})
    .then(({data}) => this.setState({userInfo: data[0]}))
    .catch(err => console.error('Error with get user info'))
  }

  fetchUserFeed () {
    axios.get('http://localhost:3000/feed', {params: {username: 'ufukmehmetoglu'}})
    .then(({data}) => this.setState({feed: data}))
    .then(() => console.log(this.state))
    .catch(err => console.error('Error with get user info'))
  }

  render () {
    const { firstName, lastName, username, avatar, location, following, followers} = this.state.userInfo;
    const { feed } = this.state;
    return (
      <div>
        <Navbar />
        <div className="feed-main">
          <div className="user-info">
            <div className="user-info-inner">
              <img className="avatar-photo" src={avatar} />
              <div className="full-name">{firstName} {lastName}</div>
              <div className="username">@{username}</div>
              <div className="followers">{followers} followers</div>
              {/* <div className="following">{following.length} following</div> */}
              <div className="location">{location}</div>
            </div>
          </div>
          <div className="feed-post-main">
            {feed.map((item, index) => <FeedPosts item={item} key={index}/>)}
          </div>
        </div>
      </div>
    )
  }
}

export default Feed;