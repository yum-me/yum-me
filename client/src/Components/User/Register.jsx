import React from 'react'
import ReactDOM from 'react-dom'
import User from './User.css'
import axios from 'axios';
import Login from './Login.jsx'
import NavBar from '../Navbar/Navbar.jsx'
import { Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom"


class Register extends React.Component {
  constructor() {
    super()
    this.state ={ 
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password:"",
      password2: "",
      avatar: "",
      file: "",
      location: "", 
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleUploadImage(e){
    e.preventDefault();
    this.setState({
      file: e.target.files[0]
    },console.log("image" ,this.state.file))
  }

  async submit(event){
    event.preventDefault();
    const { file} = this.state;
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', `${process.env.PASSWORD}`);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NAME}/image/upload`,

    formData
  );
    const {username, firstName, lastName, email, password, password2, avatar, location} = this.state;
    axios 
      .post('/register',{username, firstName, lastName, email, password, password2, avatar: response.data.url, location})
      .then(() => {
        this.setState({redirect: true})
      })
      .catch(err => console.log(err))
    this.form.reset();
  }

  render() {
    const { redirect } = this.state;
    if(redirect){
      return <Redirect to="/login"/>
    }
    return (
    <div>
      <NavBar username={''} avatar={''}/>
      <div className="mainRegisterContainer">
        <div className="mainRegister">
          <form className="userRegister" onSubmit={this.submit} ref={form => this.form = form}>
            <div className="signupHeader">
              <img src="https://res.cloudinary.com/kjhogan/image/upload/v1535738846/signup_ldp9oz.png" ></img>
              <h1>Sign Up</h1>
            </div>
            <input className="usernameRegister input" type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} required/>
            <input className="usernameRegister input" type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange} required/>
            <input className="usernameRegister input" type="text" name="username" placeholder="Username" onChange={this.handleChange} required/>
            <input className="usernameRegister input" type="email" name="email" placeholder="E-mail" onChange={this.handleChange} required/>
            <input className="usernameRegister input" type="password" minLength="6" name="password" placeholder="Password"onChange={this.handleChange} required />
            <input className="usernameRegister input" type="password" name="password2" placeholder="Confirm Password"onChange={this.handleChange}/>
            <input className="usernameRegister input" type="text" name="location" placeholder="Location"onChange={this.handleChange} required/>
            <div className="registerAvatar">
              <p>Avatar</p>
              <a>
              <input className="avatarInput"  type="file" onChange={this.handleUploadImage} />
              </a>
            </div>
            <div>
              <a className="submitRegister"  href="#">
                <button className="submitRegisterBtn" type="submit">sign up</button>
              </a>              
              <p className="hasAccount">Already have an account?</p>
              <Link to={{pathname: `/login`, state: {username: '', avatar: ''}}}>
                <p className="loginFromSignup"><strong>Log In</strong></p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
  }
}
export default Register