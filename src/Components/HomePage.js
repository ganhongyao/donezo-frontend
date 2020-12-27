import React, { Component, useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';
import axios from 'axios';
import update from 'immutability-helper';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
		padding: '0px',
		paddingLeft: '10px'
	},
}))(TableCell);

function createData(title, dueDate, tag, completed) {
  return { title, dueDate, tag, completed };
}

const useStyles = (theme) => ({
	table: {
		width: '70%',
		margin: '0 auto',
	},

	container: {
		width: '70%',
		backgroundColor: 'white',
		margin: '0 auto'
	},

	alert: {
		color: '#54e346',
		marginLeft: '15%'
	}
});

class HomePage extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			newTitle: '',
			newDueDate: '',
			newTag: 'None'
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		axios.get('http://localhost:3001/api/v1/todos.json')
		.then(response => {
			console.log(response)
			this.setState({todos: response.data})
		})
		.catch(error => console.log(error))
	}

	handleDelete(id) {
		axios.delete(`http://localhost:3001/api/v1/todos/${id}`)
		.then(response => {
			const todoIndex = this.state.todos.findIndex(x => x.id === id)
			const todos = update(this.state.todos, { $splice: [[todoIndex, 1]]})
			this.setState({todos: todos})
		})
		.catch(error => console.log(error))
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleDateChange(event, date) {
		this.setState({
			newDueDate: date
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(Number.isInteger(this.state.newDueDate))
		if (Number.isInteger(this.state.newDueDate)) {
			const adjustedDate = (new Date(this.state.newDueDate)).toLocaleString().split(",")[0]
			console.log(adjustedDate)
			this.setState({
				newDueDate: adjustedDate
			}
		)}
		console.log(this.state.newDueDate);
		const year = this.state.newDueDate.split("/")[2];
		const day = this.state.newDueDate.split("/")[1];
		const month = this.state.newDueDate.split("/")[0];
		const adjustedDate = year + "-" + month + "-" + day;
		console.log(adjustedDate)
		axios.post(
			'http://localhost:3001/api/v1/todos',
			{ todo:
				{
				title: this.state.newTitle,
				duedate: adjustedDate,
				description: '',
				completed: false
				}
			}
			)
			.then(response => {
			console.log(response)
			const todos = update(this.state.todos, {
				$splice: [[0, 0, response.data]]
			})
			this.setState({todos: todos})
			})
			.catch(error => console.log(error))
	}

	render() {

		const { classes } = this.props;
		
		return (
			<div>
				<AddTodoForm 
				addTask={this.handleSubmit} 
				handleChange={this.handleChange} 
				handleDateChange={this.handleDateChange}
				defaultDate={this.state.newDueDate} 
				defaultTag={this.state.newTag}
				/>
				<span className={classes.alert}>You have <span style={{color: 'white'}}>{this.state.todos.length}</span> unfinished tasks.</span>
				<Table className={classes.table} aria-label="tasktable" >
					<TableHead>
					<TableRow>
						<StyledTableCell>Task</StyledTableCell>
						<StyledTableCell align="left">Due Date</StyledTableCell>
						<StyledTableCell align="left">Tag</StyledTableCell>
						<StyledTableCell align="center">Actions</StyledTableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{this.state.todos.map((todo) => (<TodoItem key={todo.id} todo={todo} handleDelete={this.handleDelete}/>))}
					</TableBody>
				</Table>
			</div>
		)
	}
}

export default withStyles(useStyles)(HomePage);