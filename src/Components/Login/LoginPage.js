import React, { Component} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, TextField, withStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';

const useStyles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        marginLeft: '10%',
        marginRight: '10%',
        padding: '1%',
        marginTop: '3%',
        
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
        const { email, password } = this.state;
        event.preventDefault();
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                LOG IN
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
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
                    <Grid container>
                        <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link to="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
} 

export default withStyles(useStyles)(LoginPage);