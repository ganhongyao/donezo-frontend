import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { IconButton, ListItem, TableCell, TableRow } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',  
        lineHeight: '10px',
        padding: '0px',
        paddingLeft: '15px'
    },

    cell: {
        lineHeight: '10px',
        padding: '0px',
        paddingLeft: '15px'

    }
}));

export default function TodoItem(props) {
    const classes = useStyles();

    return (
        <TableRow className={classes.root}>
            <TableCell className={classes.cell}>{props.todo.title}</TableCell>
            <TableCell className={classes.cell}>{props.todo.dueDate}</TableCell>
            <TableCell className={classes.cell}>{props.todo.tag}</TableCell>
            <TableCell className={classes.cell} align='center'>
                <IconButton aria-label="edit"><EditIcon /></IconButton>
                <IconButton aria-label="delete"><DeleteIcon /></IconButton>
                <IconButton aria-label="done"><DoneOutlineIcon /></IconButton>
            </TableCell>
        </TableRow>
    )
}