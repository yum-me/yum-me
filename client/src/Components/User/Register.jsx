import React from 'react'
import ReactDOM from 'react-dom'
import User from './User.css'
import axios from 'axios';
import Login from './Login.jsx'
import { Route, Link, BrowserRouter as Router } from "react-router-dom"


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
      avatar: "adad",
      location: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  submit(e){
    e.preventDefault();
    const {username, firstName, lastName, email, password, password2, avatar, location} = this.state;
    axios 
      .post('/register',{username, firstName, lastName, email, password, password2, avatar, location})
      .then(() => {
        <Route exact path="/login" component={Login} />
        ReactDOM.render(<Login />, document.getElementById("app"));
        console.log('Succesfully registered')
      })
      .catch(err => console.log(err))
    this.form.reset();
  }

  render() {
    return (
      <div>
        <form className="userRegister" onSubmit={this.submit} ref={form => this.form = form}>
          <div>
            <img src="" ></img>
            <h1>sign up</h1>
          </div>
          <div>
            <input className="firstName input" type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} required/>
            <input className="lastName input" type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange} required/>
          </div>
          <input className="usernameRegister input" type="text" name="username" placeholder="Username" onChange={this.handleChange} required/>
          <input className="usernameRegister input" type="email" name="email" placeholder="E-mail" onChange={this.handleChange} required/>
          <input className="usernameRegister input" type="password" minlength="6" name="password" placeholder="Password"onChange={this.handleChange} required />
          <input className="usernameRegister input" type="password" name="password2" placeholder="Confirm Password"onChange={this.handleChange}/>
          <input className="usernameRegister input" type="text" name="location" placeholder="Location"onChange={this.handleChange} required/>
          <div className="avatar">
            <p>Avatar</p>
            <a>
            <input className="avatarInput"  type="file" />
            </a>
          </div>
          <div>
            <a className="submitRegister"  href="#">
            <input className="submitRegister input" type="submit" value="Sign Up" />
            </a>
            
          </div>
        </form>
      </div>
    )
  }
}
export default Register