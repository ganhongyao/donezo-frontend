import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, TextField } from '@material-ui/core';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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


}));

export default function SignupPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Avatar className={classes.avatar}>
                <ContactPhoneIcon />
            </Avatar>
            SIGN UP
            <form className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    size="small"
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    size="small"
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                />
                </Grid>
                </Grid>
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
                    autoFocus
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
                    SIGN UP
                </Button>
            </form>
        </div>
    )
}