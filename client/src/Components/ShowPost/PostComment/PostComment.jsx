import React from 'react';
import './PostComment.css'
import moment from 'moment'

const PostComment = props => {
  const { author, createdAt, text, _id} = props.item
  return (
    <div className="single-comment">
      <span>{author.username}</span>
      <div>{text}</div>
      <span>{moment(createdAt).fromNow()}</span>
    </div>
  )
}

export default PostComment;