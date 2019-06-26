import React from 'react';
import './PostComment.css'
import moment from 'moment'

const PostComment = props => {
  const { author, createdAt, text, _id} = props.item
  return (
    <div className="single-comment">
      <div className="comment-details">
        <img src={author.avatar}></img>
        <div>
          <p className="comment-text"><span>{author.username}</span>{text}</p>
          <p className="comment-date">{moment(createdAt).fromNow()}</p>    
        </div>
      </div>
    </div>
  )
}

export default PostComment;