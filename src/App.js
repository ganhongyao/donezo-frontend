import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import TodayPage from './pages/TodayPage';
import CalendarPage from './pages/CalendarPage';
import CompletedPage from "./pages/CompletedPage";
import ProtectedRoute from './components/ProtectedRoute'
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
      isLoading: true,
      backdrop: false
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
  }

  // looks for the 'user' item in localStorage and sets state of app if user is found
  componentDidMount() {
    const loggedinUser = localStorage.getItem('user');
    if (loggedinUser) {
      const foundUser = JSON.parse(loggedinUser)
      this.setState({user: foundUser})
      this.setState({isLoggedIn: true})
    }
    this.setState({isLoading: false})
  }

  // sets state of app upon login and persist the user in localStorage
  handleLogin(data) {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  // resets state of app upon logout and remove user item from localStorage
  handleLogout() {
    this.setState({
      user: {},
      isLoggedIn: false
    })
    localStorage.clear()
  }

  // renders the loading backdrop, used when awaiting data requests
  handleLoading() {
    this.setState(prevstate => ({
      backdrop: !prevstate.backdrop
    }))
  }

  render() {
    const { classes } = this.props;       
    return ( !this.state.isLoading &&
      <div className={classes.root}>
        <ToastContainer bodyClassName={classes.toast} />
        <Backdrop className={classes.backdrop} open={this.state.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Router>
          <Header user={this.state.user} isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
          <Switch>
            <Route path="/" exact render={props => this.state.isLoggedIn 
              ? <HomePage {...props} user={this.state.user} handleLoading={this.handleLoading}/> 
              : <LoginPage {...props} handleLogin={this.handleLogin} isLoggedIn={this.state.isLoggedIn} handleLoading={this.handleLoading}/>}/>
            <Route path="/login" render={props => (<LoginPage {...props} handleLogin={this.handleLogin} handleLoading={this.handleLoading} />)}/>
            <Route path="/signup" render={props => (<SignupPage {...props} handleLogin={this.handleLogin} handleLoading={this.handleLoading} />)}/>
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
