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
import Home from "./Components/Home"

const useStyles = makeStyles((theme) => ({
    root1: {
      minHeight: '100vh',
      background: 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5))',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/bg.png'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      fontFamily: 'Nunito',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },

    root2: {
      backgroundColor: 'white'
    }

}))

export default function App() {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const loginHandler = () => {
    setLoggedIn(!isLoggedIn);
  }

  return (
    <div className={true ? classes.root1 : classes.root2}>
      <Router>
        <Header isLoggedIn={isLoggedIn} loginHandler={loginHandler}/>
        <Switch>
          <Route path="/" exact component={LandingPage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/signup" component={SignupPage}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}
