import React from 'react'
import ReactDOM from 'react-dom'
import style from './CreatePost.css'
import DropDownRestaurant from './DropDownRestaurant.jsx'
import Home from '../Home/Home.jsx'
import NavBar from '../Navbar/Navbar.jsx'
import axios from 'axios'
import { Route, Link, BrowserRouter as Router } from "react-router-dom"


class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      title: "",
      restaurant: "",
      text: "",
      author: "",
      location: "",
      image: null,
      file: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePickRestaurant = this.handlePickRestaurant.bind(this);
    this.handleYelpApi = this.handleYelpApi.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, console.log(this.state))
  }
  handleUploadImage(e) {
    e.preventDefault();
    this.setState({
      file: e.target.files[0]
    }, console.log("image", this.state.file))
  }
  handlePickRestaurant(option) {
    this.setState({
      restaurant: option,
      restaurants: []
    })
  }
  handleYelpApi(e) {
    const { location } = this.state;
    this.setState({
      restaurant: e.target.value
    }, () => {
      axios
        .get('/yelp', { params: { term: this.state.restaurant, location } })
        .then((data) => {
          var result = [];
          data.data.forEach(obj => {
            result.push(obj.name);
          });
          this.setState({
            restaurants: result
          })

        })
        .catch(err => console.log('Error api yelp', err))
    })

  }


  async handleSubmit(event) {
    event.preventDefault();
    const { restaurant, title, text, image, author, file } = this.state;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${process.env.PASSWORD}`);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NAME}/image/upload`,

      formData
    );
    axios
      .post('/writepost', { restaurant: restaurant, title: title, text: text, image: response.data.url, author: { username: this.props.location.state, avatar:"avatar"} })
      .then(() => {
        console.log('Succesfully posted')
      })
      .catch(err => console.log('Error getting', err))
    this.setState({
      title: "",
      restaurant: "",
      text: "",
      author: "",
      image: ""
    })
    this.form.reset();
  }



  render() {
    console.log(this.props)
    var style1 = {
      position: "relative",
      right: "80px"
    }
    var style2 = {
      position: "relative",
      right: "80px",
      zIndex: "-1"
    }
    let result;
    if (this.state.restaurants.length > 0 ? result = style2 : result = style1)
      return (

        <div>
          <NavBar />

          <div className="createPostMain">

            <form className="createForm" onSubmit={this.handleSubmit} ref={form => this.form = form} >

              <h1 className="headerPost">Create New Post</h1>
              <input className="createInput" type="text" name="title" placeholder="Title" onChange={this.handleChange} required/>
              <input className="createInput" type="text" name="location" placeholder="Location" onChange={this.handleChange} required/>
              <div className="createSearch">
                <input className="createInput" type="text" placeholder="Restaurant" value={this.state.restaurant} onChange={this.handleYelpApi} required/>
                {this.state.restaurants.length > 0 ? <DropDownRestaurant restaurants={this.state.restaurants} handlePickRestaurant={this.handlePickRestaurant} /> : ""}
              </div>
              <input style={result} type="file" onChange={this.handleUploadImage} required/>
              <textarea className="createTextArea" rows="100" cols="100" name="text" placeholder="What is your story..." onChange={this.handleChange} required></textarea>
              <input className="createSubmit" type="submit" />

            </form>
          </div>
        </div>
      )
  }
}

export default CreatePost;
