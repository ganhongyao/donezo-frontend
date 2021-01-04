import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import update from 'immutability-helper';
import AddTodoForm from './AddTodoForm';
import TodoContainer from './TodoContainer'
import { TextField } from '@material-ui/core';
import SearchBar from './SearchBar';

const useStyles = (theme) => ({
	sortButton: {
		color: 'white'
	},

	alert: {
		color: '#54e346',
		marginLeft: '15%'
	},

	container: {
		display: 'flex',
		marginTop: '10%',
		width: '70%',
		margin: '0 auto',
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

class HomePage extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			todos: null,
			newTitle: '',
			newDueDate: '',
			newTag: [],
			length: 0,
			tags: [],
			titleSortedAsc: 0,
			dateSortedAsc: 0,
			
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
		var isSingular = this.state.length === 1;
		var canSubmit = this.state.newTitle.length > 0 && this.state.newDueDate.length > 0;
		console.log(this.state.todos)

		return (
			this.state.todos && 
			<div>
				<div className={classes.container}>
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
					<SearchBar />
				</div>
				
				<span className={classes.alert}>
					You have <span style={{color: 'white'}}>{this.state.todos.length}</span> unfinished task{!isSingular && 's'}.
				</span>
				
				<TodoContainer
					todos={this.state.todos}
					tags={this.state.tags}
					handleChange={this.handleChange}
					handleUpdate={this.handleUpdate}
					handleDelete={this.handleDelete}
					handleSortTitle={this.handleSortTitle}
					handleSortDate={this.handleSortDate}
					titleSortedAsc={this.state.titleSortedAsc} 
                    dateSortedAsc={this.state.dateSortedAsc}
					/>
			</div>
		)
	}
}

export default withStyles(useStyles)(HomePage);