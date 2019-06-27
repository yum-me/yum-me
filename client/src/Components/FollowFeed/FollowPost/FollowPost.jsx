import React from 'react';
import './FollowPost.css';
import moment from 'moment';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeedPost = props => {
  const { username, avatar } = props
  const { author, comments, image, likes, recommend, restaurant, text, title, createdAt, _id } = props.item;
  const recommendImage = recommend === "Yes" ? 
    <img className="recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1536097829/happy_dbmo3c.png"></img> :
    <img className="recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1536097829/sad_fcfqhu.png"></img>
    
  return (
    <div>
      <Link to={{pathname: `/post`, id: _id, username: username, avatar: avatar}}>
      <div className="feed-post">
        <div className="feed-post-user-stripe">
          <img className="post-avatar" src={author.avatar}></img>
          <div>
            {/* INSERT USER PROFILE LINK BELOW */}
            <h3>{author.username}</h3>
            <p><strong>Restaurant: </strong>{restaurant}</p>
          </div>
          <div className="recommend-img-container">{recommendImage}</div>          
        </div>
        <img className="post-image" src={image} />
        <div className="post-well">
          <h3>{title}</h3>
          <p>{text.slice(0,200)}...</p>
          <div className="post-detail">
            <div><span><FaThumbsUp /></span> {likes} </div>
            <div><span><FaCommentAlt className="post-card-comment-icon" /></span> {comments.length}</div>
            <p>{moment(createdAt).fromNow()}</p>
          </div>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default FeedPost;