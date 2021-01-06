import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import { withStyles } from '@material-ui/core/styles';
import TodoContainer from './TodoContainer';
import SearchBar from './SearchBar';


const useStyles = (theme) => ({
    alert: {
		color: '#54e346',
    },
    
    container: {
		display: 'flex',
		marginTop: '10%',
		width: '70%',
		margin: '0 auto',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
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

class CompletedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: null,
            tags: [],
            titleSortedAsc: 0,
            dateSortedAsc: 0,
            searchbar: ''
        }

		this.handleChange = this.handleChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleSortTitle = this.handleSortTitle.bind(this);
        this.handleSortDate = this.handleSortDate.bind(this);
    }

    componentDidMount() {
		axios.get('http://localhost:3001/api/v1/todos.json',
		{
			params: {
				user_id: this.props.user.id
			}
		})
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

    handleChange(event) {
        if (event.target.name === "searchbar") {
            this.setState({
                [event.target.name]: event.target.value.toLowerCase()
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
		
	}
    
    handleDelete(id) {
		axios.delete(`http://localhost:3001/api/v1/todos/${id}`)
		.then(response => {
			const todoIndex = this.state.todos.findIndex(x => x.id === id)
			const todos = update(this.state.todos, { $splice: [[todoIndex, 1]]})
			this.setState({todos: todos})
		})
		.catch(error => console.log(error));
    }

    handleUpdate(todo) {
		const todoIndex = this.state.todos.findIndex(x => x.id === todo.id)
    	const todos = update(this.state.todos, {[todoIndex]: { $set: todo }})
		this.setState({todos: todos})
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
        var searchResults = this.state.todos && 
            this.state.todos.filter(todo =>  todo.title.toLowerCase().includes(this.state.searchbar) || todo.tags_list.includes(this.state.searchbar))

        return(
            this.state.todos &&
            <div>
                
                <div className={classes.container}>
                <span className={classes.alert}>
                        Completed
                    </span>

                    <SearchBar handleChange={this.handleChange}/>
                </div>
                

                <TodoContainer className={classes.root}
					todos={searchResults}
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

export default withStyles(useStyles)(CompletedPage)