import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
    },

    field: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2%'
    },

    icon: {
        marginRight: '2%'
    },

    chip: {
        marginTop: '3px',
        marginBottom: '3px',
        marginLeft: '3px',
        fontSize: '10px',
        backgroundColor: '#54e346',
    },
}));

export default function ItemDialog(props) {
    const classes = useStyles();

    var now = new Date();
    var duedate = new Date(props.todo.duedate);
    var days = Math.ceil((duedate - now) / (1000 * 3600 * 24))
    if (days > 1) {
        days = days.toString() + " days left"
    } else if (days === 1) {
        days = days.toString() + " day left"
    } else if (days === 0) {
        days = "due today"
    } else {
        days = "overdue"
    }

    return (
        <Dialog fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="createform" maxWidth="md" className={classes.root}>
            <DialogTitle id="createform">{props.todo.title}</DialogTitle>
            <DialogContent>
                <div className={classes.field}>
                    <img src={process.env.PUBLIC_URL + '/calendar.png'} className={classes.icon}/>
                    {props.todo.duedate} {" "} 
                    ( {days} )<br/>  
                </div>
                <div className={classes.field}>
                    <img src={process.env.PUBLIC_URL + '/description.png'} className={classes.icon}/>
                    {props.todo.description || " - No description - "}
                </div>
                <div className={classes.field}>
                    <img src={process.env.PUBLIC_URL + '/tag.png'} className={classes.icon}/>
                    {props.todo.tags_list.map(tag => (<Chip label={tag} size="small" className={classes.chip}/>))
}
                </div>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary" style={{margin: '0 auto'}}>
                    Close
                </Button>
                
            </DialogActions>
        </Dialog>
    )
}