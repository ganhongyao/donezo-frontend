import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import { withStyles } from '@material-ui/core/styles';
import TodoContainer from './TodoContainer';


const useStyles = (theme) => ({
    root: {
        marginTop: '10%'
    },

    alert: {
		color: '#54e346',
        marginLeft: '15%',
	},
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

class CompletedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: null,
            tags: []
        }
    }

    componentDidMount() {
		axios.get('http://localhost:3001/api/v1/todos.json')
		.then(response => {
			console.log(response)
			this.setState({todos: response.data.filter(todo => todo.completed)})

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

    handleUpdate(todo) {
		const todoIndex = this.state.todos.findIndex(x => x.id === todo.id)
    	const todos = update(this.state.todos, {[todoIndex]: { $set: todo }})
		this.setState({todos: todos})
		this.setState({length: this.state.length - 1})
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
        return(
            this.state.todos &&
            <div className={classes.root}>

                <span className={classes.alert}>
                    Completed
				</span>

                <TodoContainer className={classes.root}
					todos={this.state.todos}
					tags={this.state.tags}
					length={this.state.length}
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

export default withStyles(useStyles)(CompletedPage)