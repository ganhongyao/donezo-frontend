import React, { Component } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { IconButton, ListItem, TableCell, TableRow, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import EditTodoForm from './EditTodoForm';
import axios from 'axios';

const useStyles = (theme) => ({
    root: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',  
        lineHeight: '15px',
        padding: '0px',
        paddingLeft: '15px',
        height: '40px',
        
    },

    cell: {
        lineHeight: '15px',
        padding: '0px',
        paddingLeft: '15px',
        height: '40px'
    },

    actionscell: {
        lineHeight: '15px',
        padding: '0px',
        paddingLeft: '15px',
        display: 'flex',
        height: '40px',
        alignItems: 'center',
    },

    actionicon: {
        fill: 'black'
    }
});

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.todo.title,
            duedate: this.props.todo.duedate,
            completed: this.props.todo.completed
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
    }

    handleDelete() {
        this.props.handleDelete(this.props.todo.id)
    }

    handleComplete() {
        const todo = {title: this.state.title, duedate: this.state.duedate, completed: !this.state.completed}
        axios.put(
        `http://localhost:3001/api/v1/todos/${this.props.todo.id}`,
        {todo: todo}
        )
        .then(response => {
        console.log(response)
        this.props.handleUpdate(response.data)
        })
        .catch(error => console.log(error))
    }

    handleEdit() {
        const todo = {title: this.state.title, duedate: this.state.duedate, completed: this.state.completed}
        axios.put(
        `http://localhost:3001/api/v1/todos/${this.props.todo.id}`,
        {todo: todo}
        )
        .then(response => {
        console.log(response)
        this.props.handleUpdate(response.data)
        })
        .catch(error => console.log(error))
    }

    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
    }
    
    handleDateChange(event, date) {
		const year = date.split("/")[2];
		const day = date.split("/")[1];
		const month = date.split("/")[0];
		const adjustedDate = year + "-" + month + "-" + day;
		this.setState({
			duedate: adjustedDate
		})
    }
    
    render() {
        const { classes } = this.props;
        var canEdit = this.state.title.length > 0 && this.state.duedate.length > 0;

        return (
            <TableRow className={classes.root}>
                <TableCell className={classes.cell}>{this.props.todo.title}</TableCell>
                <TableCell className={classes.cell}>{this.props.todo.duedate}</TableCell>
                <TableCell className={classes.cell}>{this.props.todo.tag}</TableCell>
                <TableCell className={classes.actionscell} align='center'>
                    <EditTodoForm 
                        todo={this.props.todo} 
                        handleChange={this.handleChange} 
                        handleEdit={this.handleEdit} 
                        handleDateChange={this.handleDateChange} 
                        defaultDate={this.state.duedate}
                        canEdit={canEdit}
                        />
                    <IconButton aria-label="delete" onClick={this.handleDelete}><DeleteIcon className={classes.actionicon}/></IconButton>
                    <IconButton aria-label="done" onClick={this.handleComplete}><DoneOutlineIcon className={classes.actionicon}/></IconButton>
                </TableCell>
            </TableRow>
        )
    }
}

export default withStyles(useStyles)(TodoItem);