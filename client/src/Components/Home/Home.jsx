import React from 'react';
import './Home.css';
import  { Link } from 'react-router-dom'

const Home = () => {
  return(
    <div className="landing-body">
      <div className="landing-container">
        <div className="landing-container-flex">
          <div>
              <h2 className="landing-h2">welcome to</h2>
            <h1 className="landing-h1">yum.me</h1>
          </div>
          <div>
            <img src="https://res.cloudinary.com/kjhogan/image/upload/v1561481023/landing_image_2000_tqfac0_1_fuipz1.png" className=""></img>  
          </div>
        </div>
        <div className="landing-button-container">
          <Link to={{pathname: `/browse`, state: {username: '', avatar: ''}}}>
            <a href="#">
              <button className="button-main">see what's new</button>
            </a>
          </Link>   
          <Link to="/login">
            <a href="#">
                <button className="button-foil">join</button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;