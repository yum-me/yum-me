import React from 'react'
import ReactDOM from 'react-dom'
import style from './CreatePost.css'
import DropDownRestaurant from './DropDownRestaurant.jsx'
import Home from '../Home/Home.jsx'
import NavBar from '../Navbar/Navbar.jsx'
import axios from 'axios'
import { Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom"


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
      file: null,
      recommended: true, 
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePickRestaurant = this.handlePickRestaurant.bind(this);
    this.handleYelpApi = this.handleYelpApi.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleRecommend = this.handleRecommend.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleRecommend(e) {
    if(e.target.value === 'recommendYes') {
      this.setState({
        recommended: true
      })
    } else if(e.target.value === 'recommendNo') {
      this.setState({
        recommended: false
      })
    }
  }
  handleUploadImage(e) {
    e.preventDefault();
    this.setState({
      file: e.target.files[0]
    })
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
    const recommend = this.state.recommended ? "Yes" : "No";
    const createdAt = new Date();
    const { restaurant, title, text, image, author, file } = this.state;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${process.env.PASSWORD}`);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NAME}/image/upload`,

      formData
    );
    axios
      .post('/writepost', { restaurant: restaurant, title: title, text: text, image: response.data.url, author: { username: this.props.location.state.username, avatar:this.props.location.state.avatar}, recommend: recommend, createdAt: createdAt} )
      .then(() => {
        this.setState({redirect: true})
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
    const { redirect } = this.state;
    const { username, avatar } = this.props.location.state;
    if(redirect){
      return <Redirect to={{pathname: `/follow/${username}`, currentUser: username, currentAvatar: avatar }}/>
    }

    var style1 = {
      position: "relative",
      right: "130px"
    }
    var style2 = {
      position: "relative",
      right: "130px",
      zIndex: "-1"
    }
    let result;
    if (this.state.restaurants.length > 0 ? result = style2 : result = style1)
      return (

        <div>
          <NavBar username={this.props.location.state.username} avatar={this.props.location.state.avatar}/>

          <div className="createPostMain">

            <div className="createPostFormContainer">
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
                <div className="createRecommend">
                  <p>Recommend?</p>
                  <div className="recommendContainer">
                    <input id="recommendYes" type="radio" name="recommend" value="recommendYes" checked={this.state.recommended} onChange={this.handleRecommend}></input>
                    <label htmlFor="recommendYes">
                      <img src="https://res.cloudinary.com/kjhogan/image/upload/v1536097829/happy_dbmo3c.png"></img>
                    </label>
                  </div>
                  <div className="recommendContainer">
                    <input id="recommendNo" type="radio" name="recommend" value="recommendNo" checked={!this.state.recommended} onChange={this.handleRecommend}></input>
                    <label htmlFor="recommendNo">
                      <img src="https://res.cloudinary.com/kjhogan/image/upload/v1536097829/sad_fcfqhu.png"></img>
                    </label>
                  </div>
                </div>
                <input className="createSubmit" type="submit" />
              </form>
            </div>
          </div>
        </div>
      )
  }
}

export default CreatePost;
