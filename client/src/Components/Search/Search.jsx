import React from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar.jsx';
import PostCard from '../Browse/PostCard/PostCard.jsx';
import UserCard from './UserCard/UserCard.jsx';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      posts: [],
      users: []
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
  }

  // fetchPosts() {
  //   axios.get('/browse')
  //     .then(({ data }) => this.setState({
  //       posts: data
  //     }))
  //     .catch(err => console.log('Could not fetch posts: ', err));
  // }

  handleSearch() {
    this.setState({
      term: this.props.match.params.term
    }, () => {
      axios.get('/search', {
        params: { term: this.state.term }
      })
      .then(({ data }) => {
        this.setState({
          posts: data.foundPosts,
          users: data.foundUsers
        })
      })
      .catch(err => console.log('Search failed: ', err));
    })
  }

  render() {

    let userList = this.state.users.length === 0 ? <p className="result-p">No users found</p> : 
      this.state.users.map((user, i) => {
        return <div className="grid-item-five hvr-grow" key={i}><UserCard user={user} /></div>               
      });

    let postList = this.state.posts.length === 0 ? <p className="result-p">No posts found</p> :  
      this.state.posts.map((post, i) => {
        return <div className="grid-item-four hvr-grow" key={i}><PostCard post={post} /></div>               
      });

    let users = this.state.users.length === 1 ? "user" : "users";
    let posts = this.state.posts.length === 1 ? "post" : "posts";
    return(
      <div>
        <Navbar />
        <div className="search">
          <h1>Search Results for "{this.state.term}"</h1>
          <div className="search-user-container">
            {/* USERS */}
            <div className="browse-wrap">
              <h2><strong>{this.state.users.length}</strong> {users}</h2>
              <div className="col-grid">
                {userList}
              </div>
            </div>
          </div>
          <div>
            {/* POSTS */}
            <div className="browse-wrap">
              <h2><strong>{this.state.posts.length}</strong> {posts}</h2>
              <div className="col-grid">
                {postList}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;