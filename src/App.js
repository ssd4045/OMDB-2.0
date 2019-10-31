import React from "react";
import "./App.css";
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/home/Landing'
import Movie from './components/home/Movie'
import Signup from './components/layout/Signup'
import Signin from './components/layout/Signin'
import Profile from './components/layout/Profile'
import Favs from './components/home/Favs'

import {HashRouter as Router, Route, Switch} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      
      <div>
        <Navbar/> 

        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/favs" component={Favs}/>
          <Route exact path="/movie/:id" component={Movie}/>
        </Switch>
        
        <Footer/>
      </div>
    );
  }
}

export default App;
