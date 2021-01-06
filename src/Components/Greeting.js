import React from 'react';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#54e346',
    },

    name: {
        color: 'white'
    }
}));

export default function Greeting(props) {
    const classes = useStyles();

    return (
        <h1 className={classes.root}>
            Welcome back, <span className={classes.name}>{props.user.name}</span>!
        </h1>
    )
}