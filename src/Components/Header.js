import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
    }

}));

export default function Header(props) {
    const classes = useStyles();

    var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate()  : objToday.getDate(),
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear();
    
    var today = dayOfWeek + " " + dayOfMonth+ " " + curMonth + ", " + curYear;

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
                    <h1 className={classes.appbarTitle}>
                        <Link to={props.isLoggedIn ? "/home" : "/"} className={classes.link}>
                        <span className={classes.greenText}>Done</span><span className={classes.whiteText}>zo.</span>
                        </Link>
                    </h1>
                    <div className={classes.today}> 
                        {props.isLoggedIn && today}
                    </div>
                    
                    {props.isLoggedIn ? loggedInBar : loggedOutBar}

                </Toolbar>
                
            </AppBar>
        </div>
        

    )
}