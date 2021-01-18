import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    appbar: {
        background: 'none',
        marginTop: '-15px',
        height: '10%',
    },

    appbarTitle: {
        color: 'white',
        textDecoration: 'none'
    },

    greenText: {
        color: '#54e346'
    },

    whiteText: {
        color: 'white'
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
    },

    today: {
        margin: '0 auto'
    },

    name: {
        marginRight: '1%'
    },

    icon: {
        marginRight: '5%'
    }

}));

export default function Header(props) {
    const classes = useStyles();
    const date = format(new Date(), "EEEE do MMMM, yyyy");
    
    var loggedInActions = (
        <div> 
            <Link to='/login' className={classes.link}>
                <Button className={classes.loginbutton} onClick={props.handleLogout} variant="outlined">
                    <ExitToAppIcon className={classes.icon}/> 
                    LogOut
                </Button>
            </Link>
        </div>
    );

    var loggedOutActions = (
        <div> 
            <Link to='/login' className={classes.link}>
                <Button className={classes.loginbutton} variant="outlined">Log In</Button>
            </Link>
            <Link to='/signup' className={classes.link}>
                <Button className={classes.signupbutton} variant="contained">Sign up</Button>
            </Link>
        </div>
    );

    return (
        <div>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <h1 className={classes.appbarTitle}>
                        <Link to={props.isLoggedIn ? "/home" : "/"} className={classes.link}>
                            <span className={classes.greenText}>Done</span><span className={classes.whiteText}>zo.</span>
                        </Link>
                    </h1>
                    <div className={classes.today}> 
                        {props.isLoggedIn && date}
                    </div>
                    <div className={classes.name}>{props.user.name}</div>
                    {props.isLoggedIn ? loggedInActions : loggedOutActions}
                </Toolbar>
            </AppBar>
        </div>
    )
}