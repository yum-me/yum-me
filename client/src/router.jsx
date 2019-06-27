import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Browse from './Components/Browse/Browse.jsx';
import Feed from './Components/Feed/Feed.jsx';
import ShowPost from './Components/ShowPost/ShowPost.jsx';
import NavBar from './Components/Navbar/Navbar.jsx'
import FollowFeed from './Components/FollowFeed/FollowFeed.jsx'
import Login from './Components/User/Login.jsx';
import Register from './Components/User/Register.jsx'
import CreatePost from './Components/CreatePost/CreatePost.jsx'



class AppRouter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
  }


  render () {
    console.log(this.state.username)
    return (
      <Router>
        <div>
         <NavBar />
  
          <Route path="/" exact render={() => <Login username={this.state.username} isAuthed={true} />} />
          <Route path="/feed" component={Feed} />
          <Route path="/follow/:username" component={FollowFeed}/>
          <Route path="/post" component={ShowPost} />
          <Route path="/createpost" component={CreatePost} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;