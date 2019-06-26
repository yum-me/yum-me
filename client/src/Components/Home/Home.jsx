import React from 'react';
import './Home.css';

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
            <a href="/browse">
                <button className="button-main">see what's new</button>
            </a>
            <a href="/login">
                <button className="button-foil">join</button>
            </a>
        </div>
      </div>
    </div>
  );
}

export default Home;