import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';

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

function createData(title, dueDate, tag, completed) {
  return { title, dueDate, tag, completed};
}

const useStyles = makeStyles({
  table: {
    width: '70%',
    margin: '0 auto',
  },

  container: {
    width: '70%',
    backgroundColor: 'white',
    margin: '0 auto'
  }
});

export default function HomePage() {
    const classes = useStyles();
    var [ tasks, setTasks ] = useState([
        createData('Walk the dog', '12/21/2020', 'Misc', false ),
        createData('Hit the gym', '12/23/2020', 'Fitness', false),
        createData('Buy eclairs for mum', '12/23/2020', 'Misc', false),
        createData('Submit CVWO Assignment', '12/31/2020', 'School', false),
        createData('Buy ice cream', '12/21/2020', 'Misc', false)
      ]);
    
    var [title, setTitle] = React.useState('');
    var [dueDate, setDueDate] = React.useState(Date.now());
    var [tag, setTag] = React.useState('None');

    function addTask(e) {
      e.preventDefault();
      // When user does not change the default value, parse date as string
      if (Number.isInteger(dueDate)) {
        dueDate = (new Date(dueDate)).toLocaleString().split(",")[0]
      }
      setTasks(tasks.concat(createData(title, dueDate, tag, false)))
      console.log(tag)
    };

    function handleTitleChange(e) {
      setTitle(e.target.value)
    }

    function handleDateChange(event, date) {
      setDueDate(date)
    }

    function handleTagChange(e) {
      setTag(e.target.value)
    }

    return (
        <div>
            <AddTodoForm 
              addTask={addTask} 
              handleTitleChange={handleTitleChange} 
              defaultDate={dueDate} 
              handleDateChange={handleDateChange}
              defaultTag={tag}
              handleTagChange={handleTagChange}/>
              <Table className={classes.table} aria-label="tasktable" >
                  <TableHead>
                  <TableRow>
                      <StyledTableCell>Task</StyledTableCell>
                      <StyledTableCell align="left">Due Date</StyledTableCell>
                      <StyledTableCell align="left">Tag</StyledTableCell>
                      <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {tasks.map((item, i) => (<TodoItem key={i} todo={item}/>))}
                  </TableBody>
              </Table>
        </div>
        
    
  );
}