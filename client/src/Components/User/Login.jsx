import React from 'react'
import ReactDOM from 'react-dom'
import User from './User.css'
import axios from 'axios';
import Register from './Register.jsx'
import Home from '../Home/Home.jsx'
import NavBar from '../Navbar/Navbar.jsx'
import { Route, Link, BrowserRouter as Router } from "react-router-dom"


class Login extends React.Component {
  constructor() {
    super()
    this.state ={ 
      email: "",
      password: ""
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
    const { email, password } = this.state;
    axios
        .get('/login', {params: {email, password}})
        .then((data) => {
          console.log('Succesfully Login')
        })
        .catch(err => console.log("Error login", err))
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="mainLoginContainer">
          <div className="mainLogin">
            <form className="userRegister" onSubmit={this.submit} ref={form => this.form = form}>
              <div className="loginHeader">
                <img src="https://res.cloudinary.com/kjhogan/image/upload/v1561577343/login_header_xocwoz_jxpedu.png" ></img>
                <h1>Log In</h1>
              </div>
              <input className="usernameRegister input" type="email" name="email" placeholder="E-mail" onChange={this.handleChange} required/>
              <input className="usernameRegister input" type="password" minLength="6" name="password" placeholder="Password"onChange={this.handleChange} required />
              <div>
                <a className="submitRegister"  href="#">
                <button className="submitRegisterBtn" type="submit">log in</button>
                {/* <input className="submitRegister input" type="submit" value="Login" /> */}
                </a>                
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login