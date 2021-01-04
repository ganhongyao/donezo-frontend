import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, withStyles } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import LandingPage from './Components/Landing/LandingPage'
import LoginPage from './Components/Login/LoginPage';
import SignupPage from './Components/Signup/SignupPage';
import Header from "./Components/Header";
import AddTodoForm from "./Components/AddTodoForm";
import HomePage from "./Components/HomePage";
import CompletedPage from "./Components/CompletedPage";

const useStyles = (theme) => ({
    rootout : {
      minHeight: '100vh',
      background: 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5))',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/loggedout-bg.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },

    rootin: {
      minHeight: '100vh',
      background: 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5))',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/loggedout-bg.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column'
      
    }

})



class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    }
    this.logIn = this.logIn.bind(this);
  }

  logIn = () => {
    console.log('loggedin');
    return <Redirect push to="/signup" />
  }

  render() {

    const { classes } = this.props;
    
    return (
      <div className={this.state.isLoggedIn ? classes.rootin : classes.rootout}>
        
        <Router>
          <Header isLoggedIn={this.state.isLoggedIn}/>
          <Switch>
            <Route path="/" exact component={this.state.isLoggedIn ? HomePage : LandingPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/signup" component={SignupPage}/>
            <Route path="/home" component={HomePage}/> 
            <Route path="/completed" component={CompletedPage}/>
          </Switch>
        </Router>
      </div>
    );
  }
  
}

export default withStyles(useStyles)(App);
