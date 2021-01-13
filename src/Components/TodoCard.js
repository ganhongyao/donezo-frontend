import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Card, CardContent, Chip } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import axios from 'axios';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    chip: {
        marginLeft: '3px',
        fontSize: '10px',
        backgroundColor: '#54e346',
        flex: 2
    },

    collab: {
        display: 'flex',
        marginTop: '5%',
    },

    avatar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    donezo: {  
        margin: '0 auto',
        '&:hover': {
            backgroundColor: '#00a152',
        },
        alignSelf: 'flex-end',
        flex: '5'
    }
}));

export default function TodoCard(props) {
    const classes = useStyles();
    
    const handleComplete = () => {
        const todo = {completed: !props.todo.completed}
        axios.put(
            `http://localhost:3001/api/v1/todos/${props.todo.id}`,
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
        <Card className={classes.root} variant="outlined">
            <CardHeader 
                title={props.todo.title}
                subheader={props.todo.tags_list.map(tag => <Chip label={tag} size="small" className={classes.chip}/>)}
                />
            <CardContent>
                {props.todo.description}
                <div className={classes.collab}>
                    {props.todo.collaborators && props.todo.collaborators.map(person => (<div className={classes.avatar}><Avatar/> {person}</div>))}
                </div>
            </CardContent>
            <CardActions>
                <Button 
                    className={classes.donezo} 
                    color="primary" 
                    variant="contained" 
                    onClick={handleComplete}
                    >
                    Donezo
                </Button>
            </CardActions>
        </Card>
    )
}