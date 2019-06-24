import React from 'react';

class RecentPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const post = this.props.post;
    return(
      <div>I am a post by {post.author.username} titled {post.title}</div>
    );
  }
}

export default RecentPost;