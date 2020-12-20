import React, { useState } from 'react';
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(title, dueDate, tag, completed) {
  return { title, dueDate, tag, completed};
}

const rows = [
  createData('Walk the dog', 159, 6.0),
  createData('Hit the gym', 237, 9.0),
  createData('Buy eclairs for mum', 262, 16.0),
  createData('Submit CVWO Assignment', 305, 3.7),
];

const useStyles = makeStyles({
  table: {
    width: '100%'
  },

  container: {
    width: '70%',
    backgroundColor: 'white',
    margin: '0 auto'
  }
});

export default function HomePage() {
    const classes = useStyles();
    const [ tasks, setTasks ] = useState([
        createData('Walk the dog', 159, 6.0),
        createData('Hit the gym', 237, 9.0),
        createData('Buy eclairs for mum', 262, 16.0),
        createData('Submit CVWO Assignment', 305, 3.7),
      ]);

    return (
        <div>
            <AddTodoForm />
            <TableContainer component={Paper} className={classes.container}>
                <Table className={classes.table} aria-label="tasktable">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Task</StyledTableCell>
                        <StyledTableCell align="right">Due Date</StyledTableCell>
                        <StyledTableCell align="right">Tag</StyledTableCell>
                        <StyledTableCell align="center">Actions</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tasks.map((task) => (
                        <StyledTableRow key={task.name}>
                        <StyledTableCell component="th" scope="row">
                            {task.title}
                        </StyledTableCell>
                        <StyledTableCell align="right">{task.dueDate}</StyledTableCell>
                        <StyledTableCell align="right">{task.completed}</StyledTableCell>
                        <StyledTableCell align="center">
                            <IconButton aria-label="edit"><EditIcon /></IconButton>
                            <IconButton aria-label="delete"><DeleteIcon /></IconButton>
                            <IconButton aria-label="delete"><DoneOutlineIcon /></IconButton>
                            
                                
                            
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
    
  );
}