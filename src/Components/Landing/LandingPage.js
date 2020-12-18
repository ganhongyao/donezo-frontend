import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from '../Header';
import FeatureContainer from './FeatureContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginPage from "../Login/LoginPage"
import SignupPage from '../Signup/SignupPage';

const useStyles = makeStyles((theme) => ({
  
}))

export default function LandingPage() {
  const classes = useStyles();
  return (
      <div className={classes.root}>  
          <CssBaseline />
          <FeatureContainer />
      </div>
    
  );
}
