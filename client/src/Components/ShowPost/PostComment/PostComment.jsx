import React from 'react';
import './PostComment.css'
import moment from 'moment'
import { Link } from 'react-router-dom';

const PostComment = props => {
  const { author, createdAt, text, _id} = props.item
  const { currentUser, currentAvatar } = props;
  return (
    <div className="single-comment">
      <div className="comment-details">
        <img src={author.avatar}></img>
        <div>
      <Link to={{pathname: `/follow/${author.username}`, currentUser: currentUser, currentAvatar: currentAvatar}} >
          <p className="comment-text"><span>{author.username}</span>{text}</p>
      </Link>
          <p className="comment-date">{moment(createdAt).fromNow()}</p>    
        </div>
      </div>
    </div>
  )
}

export default PostComment;