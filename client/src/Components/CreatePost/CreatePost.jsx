import React from 'react'
import style from './CreatePost.css'
import DropDownRestaurant from './DropDownRestaurant.jsx'
import axios from 'axios'


class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      title: "",
      restaurant: "",
      text:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePickRestaurant = this.handlePickRestaurant.bind(this);
    this.handleYelpApi = this.handleYelpApi.bind(this);
  }
  
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    },console.log(this.state))
  }
  handlePickRestaurant(option){
    this.setState({
      restaurant: option,
      restaurants:[]
    })
  }
  handleYelpApi(e){
    this.setState({
      restaurant: e.target.value
    }, () => {
      axios
        .get('/yelp',{params: {term: this.state.restaurant, location: "90005"}})
        .then((data) => {
          console.log(data.data)
          var result = [];
          data.data.forEach(obj => {
            result.push(obj.name);
          });
          this.setState({
            restaurants: result
          })
  
        })
        .catch(err => console.log('Error api yelp',err))
    })
    
  }


  render() {
    return(
      <div>
        <form class="createForm">
          <h1>Create New Post</h1>
          <input class="createInput" type="text" name="title" placeholder="title" onChange={this.handleChange}/>
          <div class="createSearch">
          <input class="createInput" type="text"  placeholder="restaurant" value={this.state.restaurant} onChange={this.handleYelpApi}/>
          {this.state.restaurants.length > 0 ? <DropDownRestaurant restaurants={this.state.restaurants} handlePickRestaurant={this.handlePickRestaurant} /> : ""}
          </div>
          <input class="createFile" type="file" name="image" placeholder="title" />
          <textarea class="createTextArea" rows="100" cols="100" name="text" placeholder="What is your story..."onChange={this.handleChange}></textarea>
        </form>
      </div>
    )

  }
}

  export default CreatePost;
