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
      <div className="createDropDown">
        <h5 class="searchResult">Search Results</h5>
        {this.props.restaurants.map(restaurant => <Restaurant restaurant={restaurant} handlePickRestaurant={this.props.handlePickRestaurant}/>)}
      </div>
       
    )
  }
}

  export default DropDownRestaurant;
