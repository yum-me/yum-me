import React from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar.jsx';
import './Browse.css';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    axios.get('/browse')
      .then(({ data }) => this.setState({
        posts: data
      }))
      .catch(err => console.log('Could not fetch posts: ', err));
  }

  render() {
    return(
      <div>
        <Navbar />
        <h1>Recent Posts</h1>
        <div>
          {this.state.posts.map((post, i) => {
            return <p key={i}>{post.title}</p>
          })}
        </div>
      </div>
    );
  }
}

export default Browse;