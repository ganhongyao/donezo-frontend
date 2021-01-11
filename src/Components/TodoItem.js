import React, { Component } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Button, Chip, IconButton, ListItem, TableCell, TableRow, withStyles, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import EditTodoForm from './EditTodoForm';
import axios from 'axios';
import ItemDialog from './ItemDialog'
import { ToastContainer, toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns'

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
        height: '40px',
        cursor: 'pointer'
    },

    greentext: {
        lineHeight: '15px',
        padding: '0px',
        paddingLeft: '15px',
        height: '40px',
        cursor: 'pointer',
        color: '#017a3f'
    },

    redtext: {
        lineHeight: '15px',
        padding: '0px',
        paddingLeft: '15px',
        height: '40px',
        cursor: 'pointer',
        color: 'red'
    },

    actionscell: {
        padding: '0px',
        display: 'flex',
        height: '40px',
        alignItems: 'center',
    },

    actionicon: {
        fill: 'black'
    },

    chip: {
        marginTop: '3px',
        marginBottom: '3px',
        marginLeft: '3px',
        fontSize: '10px',
        backgroundColor: '#54e346',
    },
});

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.todo.title,
            duedate: this.props.todo.duedate,
            completed: this.props.todo.completed,
            description: this.props.todo.description,
            tags_list: this.props.todo.tags_list,
            open: false
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
        this.handleClose = this.handleClose.bind(this)
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
        this.setState({completed: !this.state.completed})
        !this.state.completed && 
            toast.success('Donezo!', 
            {
                position: toast.POSITION.TOP_CENTER,
            })
    }

    handleEdit() {
        const todo = {title: this.state.title, duedate: this.state.duedate, completed: this.state.completed, description: this.state.description, tags_list: this.state.tags_list}
        const tagsInDB = this.props.tags.map(object => object.name);
		const TagsToAdd = this.state.tags_list.filter(item => !tagsInDB.includes(item));

		TagsToAdd.forEach(ele => 	{
			axios.post(
				'http://localhost:3001/api/v1/tags',
				{ tag:
					{
                        name: ele,
                        user_id: this.props.user.id
					}
				}
				)
				.then(response => {
				console.log(response)
				})
				.catch(error => console.log(error))
			
		})
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

    handleTagChange(event, selected) {
		this.setState({
			tags_list: selected
		})
    }
    
    handleCellClick(event) {
        this.setState({open: true})
    }

    handleClose() {
        this.setState({open: false})
    }
    
    render() {
        const { classes } = this.props;
        var canEdit = this.state.title.length > 0;
        const chips = this.props.todo.tags_list == null ? '' : this.props.todo.tags_list.map(tag => (<Chip label={tag} size="small" className={classes.chip}/>))
        const { duedate } = this.props.todo
        var daysOverdue = Math.ceil((new Date() - new Date(duedate)) / (1000 * 24 * 3600))
        var daysClass = daysOverdue === 1 ? "greentext" : daysOverdue > 1 ? "redtext" : "cell"

        var now = new Date();
        var duedateobj = new Date(duedate);
        var daysleft = Math.ceil((duedateobj - now) / (1000 * 3600 * 24))
        if (daysleft > 1) {
            daysleft = daysleft.toString() + " days left"
        } else if (daysleft === 1) {
            daysleft = daysleft.toString() + " day left"
        } else if (daysleft === 0) {
            daysleft = "due today"
        } else {
            daysleft = "overdue"
        }

        return (
            <TableRow className={classes.root}>
                <TableCell className={classes.cell} onClick={this.handleCellClick}>{this.props.todo.title}</TableCell>
                <TableCell className={classes[daysClass]} onClick={this.handleCellClick}>
                    {duedate} 
                    <span style={{color: 'white'}}> &mdash; </span>
                    {daysleft}
                </TableCell>
                <TableCell className={classes.cell}>{chips}</TableCell>
                <TableCell className={classes.actionscell} align='center'>
                    <EditTodoForm 
                        todo={this.props.todo} 
                        handleChange={this.handleChange} 
                        handleEdit={this.handleEdit} 
                        handleDateChange={this.handleDateChange} 
                        handleTagChange={this.handleTagChange}
                        defaultDate={this.state.duedate}
                        canEdit={canEdit}
                        tags={this.props.tags}
                    />
                    <Tooltip title="Delete" arrow>
                        <IconButton aria-label="delete" onClick={this.handleDelete}><DeleteIcon className={classes.actionicon}/></IconButton>
                    </Tooltip>
                    <Tooltip title="Donezo!" arrow>
                        <IconButton aria-label="done" onClick={this.handleComplete}><DoneOutlineIcon style={this.state.completed ? {fill:'green'} : {}}className={classes.actionicon}/></IconButton>
                    </Tooltip>
                </TableCell>
                
                <ItemDialog handleClose={this.handleClose} open={this.state.open} todo={this.props.todo}/>
                
            </TableRow>
                
            
        )
    }
}

export default withStyles(useStyles)(TodoItem);