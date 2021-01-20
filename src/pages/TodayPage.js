import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Drawer from '../components/Drawer';
import axios from 'axios'
import { format } from 'date-fns';
import TodoCard from '../components/TodoCard';
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
    }
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
        this.props.handleLoading();
        axios.get('https://donezo-api.herokuapp.com/api/v1/todos.json',
		{
			params: {
				user_id: this.props.user.id
			}
		})
		.then(response => {
			console.log(response);
			this.setState({todos: response.data.filter(todo => todo.duedate === format(new Date(), "yyyy-MM-dd"))});
            this.props.handleLoading();
		})
        .catch(error => console.log(error));
    }

    handleUpdate(todo) {
		const todoIndex = this.state.todos.findIndex(x => x.id === todo.id);
    	const todos = update(this.state.todos, {[todoIndex]: { $set: todo }});
		this.setState({todos: todos});
	}

    render() {
        const { classes } = this.props;
        const outstanding = this.state.todos.filter(todo => !todo.completed);
        return (
            this.state.todos &&
            <div className={classes.root}>
                <Drawer />
                <h1 style={{color: '#54e346'}}>
                        Today
                </h1>
                <div className={classes.cardcontainer}>
                    {outstanding.map(todo => 
                        <TodoCard todo={todo} key={todo.id} handleUpdate={this.handleUpdate}/>)}
                </div>
                <div style={{color: 'white'}}>
                    {outstanding.length === 0 && "You have no outstanding tasks due today."}
                </div>
            </div>
        )
    }
    
}


export default withStyles(useStyles)(TodayPage)