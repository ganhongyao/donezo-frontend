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
	}
}))(TableCell);

const useStyles = (theme) => ({
	table: {
		width: '70%',
		margin: '0 auto',
	},

	alert: {
		color: '#54e346',
		marginLeft: '15%'
	},
	
});

class HomePage extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			newTitle: '',
			newDueDate: '',
			newTag: [],
			length: 0,
			tags: []
			
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTagChange = this.handleTagChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	componentDidMount() {
		axios.get('http://localhost:3001/api/v1/todos.json')
		.then(response => {
			console.log(response)
			this.setState({todos: response.data.filter(todo => !todo.completed)})
			this.setState({length: this.state.todos.length})
		})
		.catch(error => console.log(error));
		axios.get("http://localhost:3001/api/v1/tags.json")
		.then(response => {
			console.log(response)
			this.setState({tags: response.data})
		})
	}

	handleDelete(id) {
		axios.delete(`http://localhost:3001/api/v1/todos/${id}`)
		.then(response => {
			const todoIndex = this.state.todos.findIndex(x => x.id === id)
			const todos = update(this.state.todos, { $splice: [[todoIndex, 1]]})
			this.setState({todos: todos})
		})
		.catch(error => console.log(error));
		this.setState({length: this.state.length - 1})
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleDateChange(event, date) {
		const year = date.split("/")[2];
		const day = date.split("/")[1];
		const month = date.split("/")[0];
		const adjustedDate = year + "-" + month + "-" + day;
		this.setState({
			newDueDate: adjustedDate
		})
	}

	handleTagChange(event, selected) {
		this.setState({
			newTag: selected
		})
	}

	handleUpdate(todo) {
		const todoIndex = this.state.todos.findIndex(x => x.id === todo.id)
    	const todos = update(this.state.todos, {[todoIndex]: { $set: todo }})
		this.setState({todos: todos})
		this.setState({length: this.state.length - 1})
	}

	handleSubmit(event) {
		event.preventDefault();
		if (Number.isInteger(this.state.newDueDate)) {
			const adjustedDate = (new Date(this.state.newDueDate)).toLocaleString().split(",")[0]
			this.setState({
				newDueDate: adjustedDate
			}
		)}
		
		axios.post(
			'http://localhost:3001/api/v1/todos',
			{ todo:
				{
				title: this.state.newTitle,
				duedate: this.state.newDueDate,
				description: '',
				completed: false,
				tags_list: this.state.newTag
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
		
		this.setState({length: this.state.length + 1})
		console.log(this.state)
	}

	

	render() {

		const { classes } = this.props;
		var isSingular = this.state.length == 1;
		var canSubmit = this.state.newTitle.length > 0 && this.state.newDueDate.length > 0;

		return (
			<div>
				<AddTodoForm 
				addTask={this.handleSubmit} 
				handleChange={this.handleChange} 
				handleDateChange={this.handleDateChange}
				handleTagChange={this.handleTagChange}
				defaultDate={this.state.newDueDate} 
				newTag={this.state.newTag}
				tags={this.state.tags}
				canSubmit={canSubmit}
				/>
				<span className={classes.alert}>
					You have <span style={{color: 'white'}}>{this.state.length}</span> unfinished task{!isSingular && 's'}.
				</span>
				<Table className={classes.table} aria-label="tasktable" >
				<colgroup>
					<col style={{width:"50%"}}/>
					<col style={{width:"20%"}}/>
					<col style={{width:"20%"}}/>
					<col style={{width:"10%"}}/>
				</colgroup>
					<TableHead>
					<TableRow>
						<StyledTableCell>Task</StyledTableCell>
						<StyledTableCell align="left">Due Date</StyledTableCell>
						<StyledTableCell align="center">Tag(s)</StyledTableCell>
						<StyledTableCell align="center">Actions</StyledTableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{this.state.todos.filter(item => !item.completed).map((todo) => {
						return <TodoItem 
							key={todo.id} 
							todo={todo} 
							handleDelete={this.handleDelete} 
							handleChange={this.handleChange} 
							handleUpdate={this.handleUpdate}/>
					})}
					
					</TableBody>
				</Table>
			</div>
		)
	}
}

export default withStyles(useStyles)(HomePage);