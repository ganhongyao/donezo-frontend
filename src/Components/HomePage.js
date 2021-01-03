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
import { Button } from '@material-ui/core';
import TableHeader from './TableHeader'



const useStyles = (theme) => ({
	table: {
		width: '70%',
		margin: '0 auto',
		marginBottom: '5%'
	},

	alert: {
		color: '#54e346',
		marginLeft: '15%'
	},

	sortButton: {
		color: 'white'
	}
	
});

function sortBy(arr, by, sortedAsc) {
	const isAsc = sortedAsc % 2 == 1;
	function compareTitle( a, b ) {
		if ( a.title < b.title ){
		  return isAsc ? 1 : -1;
		}
		if ( a.title > b.title ){
		  return isAsc ? -1 : 1;
		}
		return 0;
	}
	function compareDate( a, b ) {
		if ( a.duedate < b.duedate ){
		  return isAsc ? 1 : -1;
		}
		if ( a.duedate > b.duedate ){
		  return isAsc ? -1 : 1;
		}
		return 0;
	}
	let copy = arr.slice();
	by == 'title' ? copy.sort(compareTitle) : copy.sort(compareDate)
	return copy;
}

function sortByDate(arr, by, stateVar) {
	const isAsc = stateVar % 2 == 1;
	function compare( a, b ) {
		if ( a.title < b.title ){
		  return isAsc ? 1 : -1;
		}
		if ( a.title > b.title ){
		  return isAsc ? -1 : 1;
		}
		return 0;
	}
	let copy = arr.slice();
	copy.sort(compare)
	return copy;
}


  
class HomePage extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			newTitle: '',
			newDueDate: '',
			newTag: [],
			length: 0,
			tags: [],
			titleSortedAsc: 0,
			dateSortedAsc: 0
			
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTagChange = this.handleTagChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleSortTitle = this.handleSortTitle.bind(this);
		this.handleSortDate = this.handleSortDate.bind(this);
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
		const tagsInDB = this.state.tags.map(object => object.name);
		const TagsToAdd = this.state.newTag.filter(item => !tagsInDB.includes(item));

		TagsToAdd.forEach(ele => 	{
			axios.post(
				'http://localhost:3001/api/v1/tags',
				{ tag:
					{
						name: ele
					}
				}
				)
				.then(response => {
				console.log(response)
				const tags = update(this.state.tags, {
					$splice: [[0, 0, response.data]]
				})
				this.setState({tags: tags})
				})
				.catch(error => console.log(error))
			
		})

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
	}

	handleSortTitle() {
		this.setState((prevState) => ({titleSortedAsc: prevState.titleSortedAsc + 1}))
		this.setState({todos: sortBy(this.state.todos, 'title', this.state.titleSortedAsc)})
	}

	handleSortDate() {
		this.setState((prevState) => ({dateSortedAsc: prevState.dateSortedAsc + 1}))
		this.setState({todos: sortBy(this.state.todos, 'date', this.state.dateSortedAsc)})
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
					
					<TableHeader 
						handleSortTitle={this.handleSortTitle}
						handleSortDate={this.handleSortDate} 
						titleSortedAsc={this.state.titleSortedAsc} 
						dateSortedAsc={this.state.dateSortedAsc} />
					
					<TableBody>
					{this.state.todos.filter(item => !item.completed).map((todo) => {
						return <TodoItem 
							key={todo.id} 
							todo={todo} 
							tags={this.state.tags}
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