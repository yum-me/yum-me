import React from 'react';
import axios from 'axios';
import './UserCard.css';
import { MdLocationOn } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get('/userPosts', {
      params: {
        username: this.props.user.username
      }
    })
    .then(({ data }) => this.setState({
      posts: data
    }))
    .catch(err => console.log("Could not get user posts: ", err));

  }

  render() {
    let user = this.props.user;
    return(
      <div className="user-card">
        <div className="user-card-user">
          <img src={user.avatar}></img>
          <h3>{user.username}</h3>
        </div>
        <div className="user-card-details">
          <div className="user-details-grid">
            <div className="grid-item-user">
              <span><MdLocationOn /></span>
              {user.location}
            </div>
            <div className="grid-item-user">
              <span><img src="https://res.cloudinary.com/kjhogan/image/upload/v1561420052/happy_dbmo3c_1_avyakl.png"></img></span>
              {this.state.posts.length} posts
            </div>
            <div className="grid-item-user">
              <span><FaUsers /></span>
              {user.followers} followers
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;