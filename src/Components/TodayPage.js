import React, { Component } from 'react';
import { Card, CardContent, withStyles } from '@material-ui/core';
import Drawer from './Drawer';
import axios from 'axios'
import { format } from 'date-fns';

const useStyles = (theme) => ({
    root: {
		marginTop: '5%',
		width: '70%',
		margin: '0 auto',
	},
});

class TodayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
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
			this.setState({todos: response.data.filter(todo => todo.duedate === format(new Date(), "yyyy-MM-dd"))})

		})
		.catch(error => console.log(error));
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
            
            {this.state.todos.map(todo => 
                <Card>
                    <CardContent>
                        {todo.title}
                    </CardContent>
                </Card>)}
                


            </div>
        )
    }
    
}


export default withStyles(useStyles)(TodayPage)