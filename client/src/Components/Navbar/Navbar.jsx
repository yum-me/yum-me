import React from 'react';
import './Navbar.css';
import { FaBars, FaUser, FaSearch } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      username: this.props.username,
      avatar: this.props.avatar,
      term: '',
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleMenu() {
    let mainNav = document.getElementById("js-menu");
    mainNav.classList.toggle('active');
  }

  handleChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      redirect: true
    });
  }

  render() {
    const auth = this.state.username ? 
      <div>
        <Link to={{pathname: `/follow/${this.state.username}`, currentUser: this.state.username, currentAvatar: this.state.avatar}} >
          <a href="#" className="nav-links"><FaUser />   {this.state.username}</a>
        </Link>
      </div> :
      <div>
        <Link to="/login">
          <a href="#" className="nav-links">login</a>
        </Link>
        <Link to="/register">
          <a href="#" className="nav-links">signup</a>
        </Link>
      </div>
    
    if(this.state.redirect) {
      if(this.state.username) {
        return <Redirect to={{pathname: `/search/${this.state.term}`, state: { username: this.state.username, avatar: this.state.avatar }}}/>
      } else {
        return <Redirect to={{pathname: `/search/${this.state.term}`}}/>
      }
    }
    return(
      <div>
        <nav className="navbar">
          <span className="navbar-toggle" onClick={this.handleMenu}>
            <FaBars />
          </span>
          <div>
            <a href="#" className="nav-logo">
              <img src="https://res.cloudinary.com/kjhogan/image/upload/v1561339707/happy_dbmo3c_ihdbmd.png"></img>        
            </a>
            <Link to={{pathname: `/feed`, state: {username: this.props.username, avatar: this.props.avatar}}}>
            <a href="#" className="nav-logo">
              yum.me      
            </a>
            </Link>
          </div>
          <div className="nav-search-input-container">
            <div className="nav-search-flex">
              <form onSubmit={this.handleSubmit}>
                <span className="nav-search-icon"><FaSearch /></span>          
                <input id="nav-search-input" onChange={this.handleChange} placeholder="search" ></input>                
              </form>
            </div>
          </div>
          <ul className="main-nav" id="js-menu">
            <div>
              <Link to={{pathname: `/browse`, state: {username: this.state.username, avatar: this.state.avatar}}}>
                <li>
                  <a href="#" className="nav-links">browse</a>
                </li>
              </Link>              
            </div>
            <div>
              <Link to={{pathname: `/createpost`, state: {username: this.state.username, avatar: this.state.avatar}}}>
                <li>
                    <a href="#" className="nav-links">
                      create post
                      </a>
                </li>
              </Link>
            </div>
            <div>
              <li>
                {auth}
              </li>

            </div>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;