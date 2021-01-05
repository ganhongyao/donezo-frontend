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
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import Header from "./Components/Header";
import AddTodoForm from "./Components/AddTodoForm";
import HomePage from "./Components/HomePage";
import CompletedPage from "./Components/CompletedPage";

const useStyles = (theme) => ({
    root : {
      minHeight: '100vh',
      background: 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5))',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/loggedout-bg.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
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
      isLoggedIn: false,
      user: {},
      token: ''
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const loggedinUser = localStorage.getItem('user');
    console.log("mounted", loggedinUser)
    if (loggedinUser) {
      const foundUser = JSON.parse(loggedinUser)
      this.setState({user: foundUser})
      this.setState({isLoggedIn: true})
    }
  }

  handleLogin(data) {
    console.log(data.user)
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
    localStorage.setItem('user', JSON.stringify(data.user))

    
  }

  handleLogout() {
    this.setState({
      user: {},
      isLoggedIn: false
    })
    localStorage.clear()
  }

  render() {

    const { classes } = this.props;   
    
    return (
      <div className={classes.root}>
        
        <Router>
          <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
          <Switch>
            <Route path="/" exact component={this.state.isLoggedIn ? HomePage : LandingPage}/>
            <Route path="/login" render={props => (<LoginPage {...props} handleLogin={this.handleLogin} isLoggedIn={this.state.isLoggedIn}/>)}/>
            <Route path="/signup" render={props => (<SignupPage {...props} handleLogin={this.handleLogin} isLoggedIn={this.state.isLoggedIn}/>)}/>
            <Route path="/home" component={HomePage}/> 
            <Route path="/completed" component={CompletedPage}/>
          </Switch>
        </Router>
      </div>
    );
  }
  
}

export default withStyles(useStyles)(App);
