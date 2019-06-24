import React from 'react';
import './Navbar.css';
import { FaBars, FaUser, FaSearch } from 'react-icons/fa';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      loggedIn: false,
      username: 'kathleen'
    };
  }

  handleMenu() {
    let mainNav = document.getElementById('js-menu');
    mainNav.classList.toggle('active');
  }

  render() {
    const auth = this.state.loggedIn ? 
      <a href="#" className="nav-links"><FaUser />   {this.state.username}</a> :
      <a href="#" className="nav-links">login / signup</a>
    
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
            <a href="#" className="nav-logo">
              yum.me        
            </a>
          </div>
          <div className="nav-search-input-container">
            <div className="nav-search-flex">
              <span className="nav-search-icon"><FaSearch /></span>          
              <input id="nav-search-input" placeholder="search" ></input>
            </div>
          </div>
          <ul className="main-nav" id="js-menu">
            <li>
              <a href="#" className="nav-links">browse</a>
            </li>
            <li>
              <a href="#" className="nav-links">create post</a>
            </li>
            <li>
              {auth}
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;