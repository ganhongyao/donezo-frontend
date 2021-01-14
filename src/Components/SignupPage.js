import React, { useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import { Avatar, Button, CssBaseline, TextField } from '@material-ui/core';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
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
        margin:'0 auto'   
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    form: {
        width: '40%', 
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

export default function SignupPage(props) {
    const classes = useStyles();
    const [ state, setState ] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })
    const [registrationErrors, setErrors] = useState("");

    const handleChange = event => {
        setState(prev => ({ 
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const handleSubmit = event => {
        event.preventDefault();
        const { name, email, password, password_confirmation } = state;
        if (password !== password_confirmation) {
            setErrors("Passwords do not match. Please re-type your passwords.")
            return
        } else if (password.length < 6) {
            setErrors("Your password is too short. Please choose another password.")
            return
        }
        axios.post("https://donezo-api.herokuapp.com/api/v1/users",
            {   
                user: {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation
                }
                                
            })
            .then(response => {
                console.log(response)
                if (response.data.status === "User created") {
                    props.handleLogin(response.data)
                    props.history.push('/home')
                }
            })
            .catch(error => {
                console.log(error.response.errors)
                setErrors(error.response.data.errors)
            })
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Avatar className={classes.avatar}>
                <ContactPhoneIcon />
            </Avatar>
            <div>SIGN UP</div>
            <div className={classes.errormessage}>{registrationErrors}</div>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                    name="name"
                    label="Name"
                    size="small"
                    variant="outlined"
                    required
                    fullWidth
                    autoFocus
                    onChange={handleChange}
                />
                
                <TextField className={classes.textfield}
                    type="email"
                    name="email"
                    label="Email Address"
                    size="small"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={handleChange}
                />
                
                <TextField
                    type="password"
                    name="password"
                    label="Password (min. 6 characters)"
                    size="small"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    type="password"
                    name="password_confirmation"
                    label="Confirm your password"
                    size="small"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}  
                >
                SIGN UP
                </Button>
            </form>
            <Link to="/login" variant="body2">
                {"Already have an account? Log in"}
            </Link>
        </div>
    )
}
