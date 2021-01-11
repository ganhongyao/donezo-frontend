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
        margin: '0 auto',
        marginBottom: '5%'
    },

    
});



class TodoContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: this.props.todos,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.todos !== prevProps.todos) {
          this.setState({todos: this.props.todos});
        }
      }

    render() {
        const { classes } = this.props;
        
        return(
            <div>
                <Table className={classes.table} aria-label="tasktable" >
                    <colgroup>
                        <col style={{width:"40%"}}/>
                        <col style={{width:"30%"}}/>
                        <col style={{width:"20%"}}/>
                        <col style={{width:"10%"}}/>
                    </colgroup>
                        
                        <TableHeader 
                            handleSortTitle={this.props.handleSortTitle}
                            handleSortDate={this.props.handleSortDate} 
                            titleSortedAsc={this.props.titleSortedAsc}
                            dateSortedAsc={this.props.dateSortedAsc}
                             />
                        
                        <TableBody>
                        {this.state.todos.map((todo) => {
                            return <TodoItem 
                                user={this.props.user}
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
