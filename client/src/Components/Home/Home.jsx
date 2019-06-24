import React from 'react';
import './Home.css';

const Home = () => {
  return(
    <div>
      <div className="landing-container">
        <img src="https://res.cloudinary.com/kjhogan/image/upload/v1536081915/landing_image_2000_tqfac0.png" className="landing-img"></img>  
        <div className="landing-button-container">
            <a href="/browse">
                <button className="button-main">see what's new</button>
            </a>
            <a href="/login">
                <button className="button-foil">log in</button>
            </a>
        </div>
      </div>
    </div>
  );
}

export default Home;