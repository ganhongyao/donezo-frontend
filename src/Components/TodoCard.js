import React, { Component } from 'react';
import { Button, Card, CardContent, Chip, withStyles } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import axios from 'axios';
import { toast } from 'react-toastify';
import update from 'immutability-helper'

const useStyles = (theme) => ({

});

class TodoCard extends Component {
    constructor(props) {
        super(props);
        this.handleComplete = this.handleComplete.bind(this);
    }

    handleComplete() {
        const todo = {completed: !this.props.todo.completed}
            axios.put(
            `http://localhost:3001/api/v1/todos/${this.props.todo.id}`,
            {todo: todo}
            )
            .then(response => {
            console.log(response)
            this.props.handleUpdate(response.data)
            })
            .catch(error => console.log(error))
            !this.props.todo.completed && 
                toast.success('Donezo!', 
                {
                    position: toast.POSITION.TOP_CENTER,
                })
    }

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.card} variant="outlined">
                <CardHeader 
                    title={this.props.todo.title}
                    subheader={this.props.todo.tags_list.map(tag => <Chip label={tag} size="small" className={classes.chip}/>)}
                    />
                <CardContent>
                    {this.props.todo.description || '- No description -'}
                </CardContent>
                <CardActions>
                    <Button 
                        className={classes.greenbutton} 
                        color="primary" 
                        variant="contained" 
                        onClick={this.handleComplete}
                        >
                        Donezo
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(useStyles)(TodoCard)