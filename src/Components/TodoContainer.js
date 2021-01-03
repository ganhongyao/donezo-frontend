import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TodoItem from './TodoItem';
import TableHeader from './TableHeader'


const useStyles = (theme) => ({
    table: {
        width: '70%',
        margin: '0 auto',
        marginBottom: '5%'
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

class TodoContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            titleSortedAsc: 0,
            dateSortedAsc: 0
        }

        this.handleSortTitle = this.handleSortTitle.bind(this);
        this.handleSortDate = this.handleSortDate.bind(this);
    }

    componentDidMount() {
		axios.get('http://localhost:3001/api/v1/todos.json')
		.then(response => {
			console.log(response)
			this.setState({todos: response.data.filter(todo => !todo.completed)})
			this.props.updateCount(this.state.todos.length)
		})
		.catch(error => console.log(error));
		axios.get("http://localhost:3001/api/v1/tags.json")
		.then(response => {
			console.log(response)
			this.setState({tags: response.data})
        })
        
        
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
            <div>
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
                        {this.state.todos.map((todo) => {
                            return <TodoItem 
                                key={todo.id} 
                                todo={todo} 
                                tags={this.props.tags}
                                handleDelete={this.props.handleDelete} 
                                handleChange={this.props.handleChange} 
                                handleUpdate={this.props.handleUpdate}/>
                        })}
                        
                        </TableBody>
                </Table>
            </div>
            
        )
    }
}

export default withStyles(useStyles)(TodoContainer)
