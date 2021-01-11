import React, { Component } from 'react';
import { Button, Card, CardContent, Chip, withStyles } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Drawer from './Drawer';
import axios from 'axios'
import { format } from 'date-fns';
import TodoCard from './TodoCard';
import update from 'immutability-helper'


const useStyles = (theme) => ({
    root: {
		marginTop: '5%',
		width: '70%',
		margin: '0 auto',
    },
    
    cardcontainer: {
        display: 'flex',
    },

    card: {
        minWidth: 275
    },

    chip: {
        marginTop: '3px',
        marginBottom: '3px',
        marginLeft: '3px',
        fontSize: '10px',
        backgroundColor: '#54e346',
    },

    greenbutton: {
        '&:hover': {
            backgroundColor: '#00a152',
        },
        margin: '0 auto'
    },
});

class TodayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.handleUpdate = this.handleUpdate.bind(this);
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
			this.setState({todos: response.data.filter(todo => !todo.completed).filter(todo => todo.duedate === format(new Date(), "yyyy-MM-dd"))})

		})
		.catch(error => console.log(error));
    }

    componentDidUpdate(prevProps) {
        if (this.props.todos !== prevProps.todos) {
          this.setState({todos: this.props.todos});
        }
      }

    handleUpdate(todo) {
		const todoIndex = this.state.todos.findIndex(x => x.id === todo.id)
    	const todos = update(this.state.todos, {[todoIndex]: { $set: todo }})
		this.setState({todos: todos})
	}

    render() {
        const { classes } = this.props;
        return (
            this.state.todos &&
            <div className={classes.root}>
                <Drawer />
    
                <h1 style={{color: '#54e346'}}>
                        Today
                </h1>

                <div className={classes.cardcontainer}>
                    {this.state.todos.map(todo => 
                        <TodoCard todo={todo} key={todo.id} handleUpdate={this.handleUpdate}/>)}
                </div>
            
                


            </div>
        )
    }
    
}


export default withStyles(useStyles)(TodayPage)