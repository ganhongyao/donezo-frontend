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
        flex: '3'
    },

    greenText: {
        color: '#54e346'
    },

    toolbar: {
        display: 'flex',

    },

    loginbutton: {
        fontFamily: 'Nunito',
        color: 'white',
        border: '2px solid #54e346'

    },

    signupbutton: {
        fontFamily: 'Nunito',
        color: 'white',
        backgroundColor: '#54e346',
        
    },

    link: {
        textDecoration: 'none'
    }

}));

export default function Header() {
    const classes = useStyles();

    return (
        <div>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <h1 className={classes.appbarTitle}><span className={classes.greenText}>Done</span>zo.</h1>
                    <Link to='/login' className={classes.link}>
                        <Button className={classes.loginbutton} variant="outlined">Log In</Button></Link>
                    <Link to='/signup' className={classes.link}>
                        <Button className={classes.signupbutton} variant="contained">Sign up</Button>
                    </Link>
                    
                    
                </Toolbar>
                
            </AppBar>
        </div>
        

    )
}