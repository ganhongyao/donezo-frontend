import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';

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

    button: {
        fontFamily: 'Nunito'
    }

}));

export default function Header() {
    const classes = useStyles();

    return (
        <div>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <h1 className={classes.appbarTitle}><span className={classes.greenText}>Done</span>zo.</h1>
                    <Button className={classes.button} variant="outlined" color="primary">Log In</Button>
                    <Button className={classes.button} variant="contained" color="primary">Sign up</Button>
                </Toolbar>
                
            </AppBar>
        </div>
        

    )
}