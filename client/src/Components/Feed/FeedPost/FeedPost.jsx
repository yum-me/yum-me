import React from 'react';
import './FeedPost.css';
import moment from 'moment';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';

const FeedPosts = props => {
  const { author, comments, image, likes, recommend, restaurant, text, title, createdAt, _id } = props.item;
  return (
    <div>
      <div className="feed-post">
        <img className="post-avatar" src={author.avatar}></img>
        {/* INSERT USER PROFILE LINK BELOW */}
        <a href="#">{author.username}</a>
        <div className="post-resturant">{restaurant}</div>
        <img className="post-image" src={image} />
        <div className="post-title">{title}</div>
        <div className="post-text">{text.slice(0,200)}...</div>
        <div className="post-detail">
          <div className="post-like"><FaThumbsUp /> {likes} </div>
          <div className="post-comments"> <FaCommentAlt className="post-card-comment-icon"/> {comments.length}</div>
          <div className="post-recommend"> Recommended: {recommend}</div>
        </div>
        <div className="post-date">{moment(createdAt).fromNow()}</div>

      </div>
    </div>
  )
}

export default FeedPosts;