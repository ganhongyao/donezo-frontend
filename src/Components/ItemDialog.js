import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Avatar, Button, Chip } from '@material-ui/core';
import axios from 'axios';
import { toast } from 'react-toastify';
import ZenMode from './ZenMode';

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
    
    collab: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    actions: {
        display: 'flex',
        justifyContent: 'center',
    },

    donezo: {
        '&:hover': {
            backgroundColor: '#00a152',
        },
    }
}));



export default function ItemDialog(props) {
    const classes = useStyles();

    const handleComplete = () => {
        const todo = {completed: !props.todo.completed}
            axios.put(
            `https://donezo-api.herokuapp.com/api/v1/todos/${props.todo.id}`,
            {todo: todo}
            )
            .then(response => {
            console.log(response)
            props.handleUpdate(response.data)
            })
            .catch(error => console.log(error))
            !props.todo.completed && 
                toast.success('Donezo!', 
                {
                    position: toast.POSITION.TOP_CENTER,
                })
    }
    
    return (
        <Dialog fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="createform" maxWidth="md" className={classes.root}>
            <DialogTitle id="createform">{props.todo.title}</DialogTitle>
            <DialogContent>
                <div className={classes.field}>
                    <img src={process.env.PUBLIC_URL + '/calendar.png'} alt='calendar' className={classes.icon}/>
                    {props.todo.duedate} {" "} 
                </div>
                <div className={classes.field}>
                    <img src={process.env.PUBLIC_URL + '/description.png'} alt='description' className={classes.icon}/>
                    {props.todo.description || " - No description - "}
                </div>
                <div className={classes.field}>
                    <img src={process.env.PUBLIC_URL + '/tag.png'} alt='tag' className={classes.icon}/>
                    {props.todo.tags_list.map(tag => (<Chip label={tag} size="small" className={classes.chip}/>))}
                </div>
                <div className={classes.field}>
                    <img src={process.env.PUBLIC_URL + '/group.png'} alt='group' className={classes.icon}/>
                    {props.todo.collaborators && props.todo.collaborators.map(person => (<div className={classes.collab}><Avatar/> {person}</div>))}
                </div>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button onClick={handleComplete} color="primary" variant="contained" className={classes.donezo}>
                    {props.todo.completed ? "Mark undone" : "Donezo"}
                </Button>
                <Button onClick={props.handleClose} color="primary" >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}