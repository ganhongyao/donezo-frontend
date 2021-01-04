import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginLeft: '1%'

    },

    
}));

export default function SearchBar(props) {
    const classes = useStyles();

    return (
            <TextField className={classes.root}
                margin="dense"
                name="searchbar"
                label="Search"
                fullWidth
                variant="filled"
                onChange={props.handleChange}
                
			/>
    )
}