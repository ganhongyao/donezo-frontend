import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    appbar: {
        background: 'none',
        marginTop: '-15px'
    },

    appbarTitle: {
        color: 'white',
        flex: '3',
        textDecoration: 'none'
    },

    greenText: {
        color: '#54e346'
    },

    toolbar: {
        display: 'flex',

    },

    loginbutton: {
        color: 'white',
        border: '2px solid #54e346'

    },

    signupbutton: {
        color: 'white',
        backgroundColor: '#54e346',
        '&:hover': {
            backgroundColor: '#00a152',
          },
        
    },

    link: {
        textDecoration: 'none'
    }

}));

export default function Header(props) {
    const classes = useStyles();

    var loggedInBar = (<div> 
                            <Link to='/login' className={classes.link}>
                                <Button className={classes.loginbutton} onClick={props.loginHandler} variant="outlined">Log Out</Button>
                            </Link>
                        </div>);

    var loggedOutBar = (<div> 
                            <Link to='/login' className={classes.link}>
                                <Button className={classes.loginbutton} variant="outlined">Log In</Button>
                            </Link>
                            <Link to='/signup' className={classes.link}>
                                <Button className={classes.signupbutton} variant="contained">Sign up</Button>
                            </Link>
                        </div>);

    return (
        
        <div>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <Link to='/' className={classes.appbarTitle}>
                        <h1><span className={classes.greenText}>Done</span>zo.</h1>
                    </Link>

                    {props.isLoggedIn ? loggedInBar : loggedOutBar}

                </Toolbar>
                
            </AppBar>
        </div>
        

    )
}