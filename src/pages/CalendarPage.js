import React, { Component } from 'react';
import { Chip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '../components/Drawer';
import { Calendar, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import update from 'immutability-helper'
import ItemDialog from '../components/ItemDialog';

const useStyles = (theme) => ({
    calendar: {
        marginTop: '7%',
        marginLeft: '15%',
        height: '80vh',
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },

    legend: {
        marginLeft: '15%',
        marginTop: '1%'
    }
});

const legend = [
    {
        style: {backgroundColor: 'green'},
        status: 'incomplete'
    },
    {
        style: {backgroundColor: '#ef4f4f'},
        status: 'incomplete and overdue'
    },
    {
        style: {backgroundColor: 'grey'},
        status: 'completed'
    }
]
legend.forEach(obj => {obj.style.color = 'white'})  

class CalendarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            openedId: 0
        }
        this.getEventColor = this.getEventColor.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    // fetches todo data from api
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
            this.setState({todos: response.data});
            this.props.handleLoading();

		})
        .catch(error => console.log(error));
    }

    // render color of todo depending on status of todo
    getEventColor(event) {
        if (event.completed) {
            return {style: legend[2].style}
        } else if (Math.ceil((new Date() - new Date(event.duedate)) / (1000 * 24 * 3600)) > 1) {
            return {style: legend[1].style}
        } else {
            return {style: legend[0].style}
        }
    }

    handleUpdate(todo) {
		const todoIndex = this.state.todos.findIndex(x => x.id === todo.id);
    	const todos = update(this.state.todos, {[todoIndex]: { $set: todo }});
        this.setState({todos: todos});
    }
    
    render() {
        const { classes } = this.props;
        const localizer = momentLocalizer(moment);
        
        return(
            this.state.todos &&
            <div>
                <Drawer/>
                <Calendar
                localizer={localizer}
                events={this.state.todos}
                className={classes.calendar}
                startAccessor="duedate"
                endAccessor="duedate"
                views={['month']}
                eventPropGetter={event => this.getEventColor(event)}
                onSelectEvent={(event) => this.setState({openedId: event.id})}
                />
                <div className={classes.legend}>
                    {legend.map(item => <Chip key={item.status} label={item.status} style={item.style} />)}
                </div>
                {this.state.todos.map(todo => 
                    <ItemDialog 
                        key={todo.id}
                        todo={todo}
                        handleClose={() => this.setState({openedId: 0})} 
                        handleUpdate={this.handleUpdate}
                        open={this.state.openedId === todo.id} />
                )}
            </div>
        )
    }
}

export default withStyles(useStyles)(CalendarPage)