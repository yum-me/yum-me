import React from 'react'
import style from './CreatePost.css'

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return(
      <p onClick={() => this.props.handlePickRestaurant(this.props.restaurant)}>{this.props.restaurant}</p> 
    )
  }
}

  export default Restaurant;