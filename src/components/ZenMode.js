import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Countdown from 'react-countdown';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import RandomQuote from './RandomQuote';

const useStyles = makeStyles((theme) => ({
    title: {
        color: '#00a152',
        fontSize: '150%'
    },
    
    countdowncontainer: {
        display: 'flex',
        justifyContent: 'center'
    },

    countdown: {
        fontSize: '500%'
    },

    timeup: {
        fontSize: '500%',
        color: '#00a152'
    },

    donezo: {
        '&:hover': {
            backgroundColor: '#00a152',
        },
    }
}));

export default function ZenMode(props) {
    const classes = useStyles();
    const [timer, setTimer] = useState(0);
    const [openCountdown, setOpenCountdown] = useState(false);
    const [state, setState] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({ 
            ...prevState,
            [name]: value
        }))
    }

    const handleReset = () => {
        setOpenCountdown(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setTimer(state.hours * 1000 * 60 * 60 + state.minutes * 1000 * 60 + state.seconds * 1000);
        setOpenCountdown(true)
    }

    return (
        <Dialog fullWidth open={props.zenOpen} onClose={props.handleZen} onExiting={handleReset} maxWidth="lg" >
            <DialogTitle className={classes.title}>Zen Mode</DialogTitle>
            <DialogContent >
                <div className={classes.countdowncontainer}>
                    {openCountdown 
                        ? <Countdown date={Date.now() + timer} daysInHours className={classes.countdown}>
                                <div>
                                    <span className={classes.timeup}>Time's up</span>
                                    <Button onClick={handleReset}>
                                        Restart
                                    </Button>           
                                </div>
                                
                            </Countdown>
                        : <form onSubmit={handleSubmit}>
                            <TextField
                                name="hours"
                                type="number"
                                margin="dense"
                                label="Hours"
                                variant="outlined"
                                onChange={handleChange}
                                value={state.hours}
                                InputProps={{
                                    inputProps: { 
                                        min: 0, max: 24
                                    }
                                }}
						    />
                            <TextField
                                name="minutes"
                                type="number"
                                margin="dense"
                                label="Minutes"
                                variant="outlined"
                                onChange={handleChange}
                                value={state.minutes}
                                InputProps={{
                                    inputProps: { 
                                        max: 60, min: 0 
                                    }
                                }}
						    />
                            <TextField
                                name="seconds"
                                type="number"
                                margin="dense"
                                label="Seconds"
                                variant="outlined"
                                onChange={handleChange}
                                value={state.seconds}
                                InputProps={{
                                    inputProps: { 
                                        max: 60, min: 0 
                                    }
                                }}
						    />
                            <Button type="submit" color="primary" variant="contained" className={classes.donezo}>
                                Begin
                            </Button>
                        </form>}
                    
                </div>
                <br/>
                <div style={{fontSize: '150%'}}>
                    {openCountdown 
                        ? <RandomQuote />
                        : "Set the duration that you want to focus for, then begin on your task."}
                </div>
            </DialogContent>
            <DialogActions className={classes.actions}>
                {openCountdown && 
                    <Button color="primary" variant="contained" onClick={props.handleComplete} className={classes.donezo}>
                        Donezo
                    </Button>}
                <Button onClick={props.handleZen} color="primary" >
                    Close
                </Button>
            </DialogActions>
        </Dialog>      
    )
}