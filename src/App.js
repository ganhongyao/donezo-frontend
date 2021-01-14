import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import TodayPage from './Components/TodayPage';
import CalendarPage from './Components/CalendarPage';
import CompletedPage from "./Components/CompletedPage";
import ProtectedRoute from './Components/ProtectedRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';




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

    toast: {
      fontFamily: 'Nunito',
      textAlign: 'center'
    },

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },

})



class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
      token: '',
      isLoading: false
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
  }

  componentDidMount() {
    this.handleLoading();
    const loggedinUser = localStorage.getItem('user');
    if (loggedinUser) {
      const foundUser = JSON.parse(loggedinUser)
      this.setState({user: foundUser})
      this.setState({isLoggedIn: true})
    }
    this.handleLoading();
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

  handleLoading() {
    this.setState(prevState => {
      isLoading: !prevState.isLoading
    })
  }

  render() {

    const { classes } = this.props;   
    
    return ( !this.state.isLoading &&
      <div className={classes.root}>
        <ToastContainer bodyClassName={classes.toast} />
        <Backdrop className={classes.backdrop} open={this.state.isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Router>
          <Header user={this.state.user} isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
          <Switch>
            <Route path="/" exact render={props => this.state.isLoggedIn 
              ? <HomePage {...props} user={this.state.user}/> 
              : <LoginPage {...props} handleLogin={this.handleLogin} isLoggedIn={this.state.isLoggedIn} handleLoading={this.handleLoading}/>}/>
            <Route path="/login" render={props => (<LoginPage {...props} handleLogin={this.handleLogin} />)}/>
            <Route path="/signup" render={props => (<SignupPage {...props} handleLogin={this.handleLogin} />)}/>
            <ProtectedRoute path="/home" component={HomePage} user={this.state.user} isLoggedIn={this.state.isLoggedIn} handleLoading={this.handleLoading}/> 
            <ProtectedRoute path="/today" component={TodayPage} user={this.state.user} isLoggedIn={this.state.isLoggedIn} handleLoading={this.handleLoading}/>
            <ProtectedRoute path="/calendar" component={CalendarPage} user={this.state.user} isLoggedIn={this.state.isLoggedIn} handleLoading={this.handleLoading}/>
            <ProtectedRoute path="/completed" component={CompletedPage} user={this.state.user} isLoggedIn={this.state.isLoggedIn} handleLoading={this.handleLoading}/> 
          </Switch>
        </Router>
        
      </div>
    );
  }
  
}

export default withStyles(useStyles)(App);
