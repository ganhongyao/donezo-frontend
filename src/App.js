import React from 'react';
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
import Header from "./Components/Header"

const useStyles = makeStyles((theme) => ({
    root: {
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
}))

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={LandingPage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/signup" component={SignupPage}></Route>
        </Switch>
      </Router>
      

    </div>
  );
}
