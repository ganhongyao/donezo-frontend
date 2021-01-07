import React from 'react';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Button, IconButton } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import ImportExportIcon from '@material-ui/icons/ImportExport';


const useStyles = makeStyles((theme) => ({
    sortButton: {
        fill: 'white',
    }
}));

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
		padding: '0px',
        paddingLeft: '10px',
	}
}))(TableCell);

export default function TableHeader(props) {
    const classes = useStyles();
    console.log(props.titleSortedAsc)
    return (
        <TableHead>
           <TableRow>
                <StyledTableCell>
                    Task
                    <IconButton aria-label="sortTitle" onClick={props.handleSortTitle} >
                        {props.titleSortedAsc === 0
                            ? <SortByAlphaIcon style={{fill: 'white'}}/>
                            : props.titleSortedAsc % 2 == 0 
                                ? <ArrowDropDownIcon style={{fill: 'white'}}/>
                                : <ArrowDropUpIcon style={{fill: 'white'}}/>}
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell align="left">
                    Due Date
                    <IconButton aria-label="sortDate" onClick={props.handleSortDate} >
                        {props.dateSortedAsc === 0
                            ? <ImportExportIcon style={{fill: 'white'}}/>
                            : props.dateSortedAsc % 2 == 0 
                                ? <ArrowDropDownIcon style={{fill: 'white'}}/>
                                : <ArrowDropUpIcon style={{fill: 'white'}}/>}
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">Tag(s)</StyledTableCell>
                <StyledTableCell align="center">Quick Actions</StyledTableCell>
			</TableRow> 
        </TableHead>
    )
}