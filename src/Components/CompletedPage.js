import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import TodoContainer from './TodoContainer';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '8%'
    },

    alert: {
        color: '#54e346',
        marginLeft: '15%',

    }
}));

export default function CompletedPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span className={classes.alert}>
                Completed Tasks
            </span>
            <TodoContainer 
					tags={["testing"]}
					
					/>
        </div>
    )
}