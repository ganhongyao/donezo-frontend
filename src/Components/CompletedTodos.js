import React, { Component } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Table, withStyles } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TodoItem from './TodoItem';
import axios from 'axios'

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
		padding: '0px',
		paddingLeft: '10px'
	},
}))(TableCell);

const useStyles = (theme) => ({
    root: {
    },

    header: {
        marginLeft: '15%',
        marginTop: '10%',
        color: '#54e346'
    },

    table: {
        width: '70%',
        margin: '0 auto'
    }
});

class CompletedTodos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: []
        }
    }

    componentDidMount() {
		axios.get('http://localhost:3001/api/v1/todos.json')
		.then(response => {
			console.log(response)
			this.setState({completed: response.data.filter(todo => todo.completed)})
		})
        .catch(error => console.log(error));
	}
    

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.header}>Completed</div>
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
                    {this.state.completed.map((todo) => {
                        return <TodoItem key={todo.id} todo={todo} handleDelete={this.handleDelete} handleChange={this.handleChange} handleUpdate={this.handleUpdate}/>
                    })}
                    
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default withStyles(useStyles)(CompletedTodos);