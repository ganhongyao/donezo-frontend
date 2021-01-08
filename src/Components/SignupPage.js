import React, { Component } from 'react';
import axios from "axios"
import { makeStyles} from '@material-ui/core/styles';
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, TextField, withStyles } from '@material-ui/core';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import { Link } from 'react-router-dom';

const useStyles = (theme) => ({
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


});

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
          }
          
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { email, password } = this.state;
        event.preventDefault();
        if (this.state.password != this.state.password_confirmation) {
            this.setState({registrationErrors: "Passwords do not match. Please re-type your passwords."})
            return
        } else if (this.state.password.length < 6) {
            this.setState({registrationErrors: "Your password is too short. Please choose another password."})
            return
        }
        axios.post("http://localhost:3001/api/v1/users",
            {   
                user: {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    password_confirmation: this.state.password_confirmation
                }
                                
            })
            .then(response => {
                console.log(response)
                if (response.data.status === "User created") {
                    this.props.handleLogin(response.data)
                    this.props.history.push('/home')
                }
            })
            .catch(error => {
                console.log(error.response.errors)
                this.setState({registrationErrors: error.response.data.errors})
            })
        
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Avatar className={classes.avatar}>
                    <ContactPhoneIcon />
                </Avatar>
                <div>SIGN UP</div>
                <div className={classes.errormessage}>{this.state.registrationErrors}</div>
                <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                    <TextField
                        name="name"
                        label="Name"
                        size="small"
                        variant="outlined"
                        required
                        fullWidth
                        autoFocus
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
    
}

export default withStyles(useStyles)(SignupPage);