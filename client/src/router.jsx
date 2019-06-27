import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Browse from './Components/Browse/Browse.jsx';
import Feed from './Components/Feed/Feed.jsx';
import ShowPost from './Components/ShowPost/ShowPost.jsx';
import NavBar from './Components/Navbar/Navbar.jsx'
import FollowFeed from './Components/FollowFeed/FollowFeed.jsx'



class AppRouter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'test'
    }
  }


  render () {
    return (
      <Router>
        <div>
         <NavBar />
  
          <Route path="/" exact render={() => <Feed test={this.state.test} isAuthed={true} />} />
          <Route path="/follow/:username" component={FollowFeed}/>
          <Route path="/post" component={ShowPost} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;