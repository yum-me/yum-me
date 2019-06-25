import React from 'react'
import style from './CreatePost.css'
import Restaurant from './Restaurant.jsx'

class DropDownRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return(
      <div class="createDropDown">
        {this.props.restaurants.map(restaurant => <Restaurant restaurant={restaurant} handlePickRestaurant={this.props.handlePickRestaurant}/>)}
      </div>
       
    )
  }
}

  export default DropDownRestaurant;
