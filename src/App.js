import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './Components/Header';
import MiddleContainer from './Components/MiddleContainer'

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
      <CssBaseline />
      <Header />
      <MiddleContainer />

    </div>
  );
}
