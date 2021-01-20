import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Avatar, Button, CssBaseline, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        padding: '1%',
        marginTop: '10%',
        width: '50%',
        margin: '0 auto'        
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    form: {
        width: '50%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        
    },

    textfield: {
        height: '50%'
    }, 

    button: {
        color: '#54e346',
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: '#00a152',
        },
    },

    errormessage: {
        color: 'red'
    }
}));

export default function LoginPage(props) {
    const classes = useStyles();
    const [ state, setState ] = useState({
        email: "",
        password: "",
    });
    const [loginErrors, setLoginErrors] = useState();

    const handleChange = (event) => {
        setState(prev => ({ 
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    // submits form data to api for authentication
    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleLoading();
        axios.post("https://donezo-api.herokuapp.com/api/v1/tokens",
        {   
                email: state.email,
                password: state.password,                  
        })
        .then(response => {
            console.log(response);
            props.handleLoading();
            if (response.data.logged_in) {
                props.handleLogin(response.data)
                props.history.push('/home')
            }
        })
        .catch(error => {
            console.log(error);
            setLoginErrors(error.response.data.errors);
            props.handleLoading();
        })
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <div>LOG IN</div><br/>
            <div className={classes.errormessage}>{loginErrors}</div>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField className={classes.textfield}
                    size="small"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    autoFocus
                    value={state.email}
                    onChange={handleChange}
                />
                <TextField
                    size="small"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={state.password}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}  
                >
                    LOG IN
                </Button>    
            </form>
            <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
            </Link>
        </div>
    )
}