import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Button, Card, CardContent, Chip, withStyles } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import axios from 'axios';
import { toast } from 'react-toastify';

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
        <Card className={classes.card} variant="outlined">
            <CardHeader 
                title={props.todo.title}
                subheader={props.todo.tags_list.map(tag => <Chip label={tag} size="small" className={classes.chip}/>)}
                />
            <CardContent>
                {props.todo.description || '- No description -'}
            </CardContent>
            <CardActions>
                <Button 
                    className={classes.greenbutton} 
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