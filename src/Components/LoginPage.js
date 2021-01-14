import React, { Component} from 'react';
import axios from 'axios';
import { Avatar, Button, CssBaseline, TextField, withStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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


});

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          loginErrors: ""
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
        event.preventDefault();
        axios.post("http://localhost:3001/api/v1/tokens",
        {   
            
                
                email: this.state.email,
                password: this.state.password,
                
            
                            
        })
        .then(response => {
            console.log(response)
            if (response.data.logged_in) {
                this.props.handleLogin(response.data)
                this.props.history.push('/home')
            }
        })
        .catch(error => {
            console.log(error)
            this.setState({loginErrors: error.response.data.errors})
        })    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <div>LOG IN</div><br/>
                <div className={classes.errormessage}>{this.state.loginErrors}</div>
                <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                    <TextField className={classes.textfield}
                        size="small"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        type="email"
                        autoFocus
                        value={this.state.email}
                        onChange={this.handleChange}
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
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.handleChange}
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
} 

export default withStyles(useStyles)(LoginPage);