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
          <Route exact path="/home" component={Home} />
          ReactDOM.render(<Home />, document.getElementById("app"));
          console.log('Succesfully Login')
        })
        .catch(err => console.log("Error login", err))
  }

  render() {
    return (
      <div className="main-main">
        <NavBar />
      <div className="mainLogin">
        <form className="userRegister" onSubmit={this.submit} ref={form => this.form = form}>
          <div>
            <img src="" ></img>
            <h1>Login</h1>
          </div>
          <input className="usernameRegister input" type="email" name="email" placeholder="E-mail" onChange={this.handleChange} required/>
          <input className="usernameRegister input" type="password" minlength="6" name="password" placeholder="Password"onChange={this.handleChange} required />
          <div>
            <a className="submitRegister"  href="#">
            <input className="submitRegister input" type="submit" value="Login" />
            </a>
            
          </div>
        </form>
      </div>
      </div>
    )
  }
}
export default Login