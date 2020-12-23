import React, { Component } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, TextField, withStyles } from '@material-ui/core';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';import { Link } from 'react-router-dom';

const useStyles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        marginLeft: '10%',
        marginRight: '10%',
        padding: '1%',
        marginTop: '3%'
        
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    form: {
        width: '60%', // Fix IE 11 issue.
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
    }


});

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
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
        console.log(this.state)
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Avatar className={classes.avatar}>
                    <ContactPhoneIcon />
                </Avatar>
                SIGN UP
                <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        name="firstName"
                        id="firstName"
                        label="First Name"
                        size="small"
                        variant="outlined"
                        required
                        fullWidth
                        autoFocus
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        name="lastName"
                        id="lastName"
                        label="Last Name"
                        size="small"
                        variant="outlined"
                        required
                        fullWidth
                        onChange={this.handleChange}
                    />
                    </Grid>
                    </Grid>
                    <TextField className={classes.textfield}
                        type="email"
                        name="email"
                        id="email"
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
                        label="Password"
                        id="password"
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
                        id="password_confirmation"
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
            </div>
        )
    }
    
}

export default withStyles(useStyles)(SignupPage);