import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './Components/Landing/LandingPage'
import LoginPage from './Components/Login/LoginPage';
import SignupPage from './Components/Signup/SignupPage';
import Header from "./Components/Header";
import AddTodoForm from "./Components/AddTodoForm";
import HomePage from "./Components/HomePage"

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      background: 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5))',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/loggedout-bg.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }

}))


export default function App() {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className={classes.root}>
      <AddTodoForm />
      <Router>
        <Header isLoggedIn={isLoggedIn}/>
        <Switch>
          <Route path="/" exact component={LandingPage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/signup" component={SignupPage}></Route>
          <Route path="/home" component={HomePage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

