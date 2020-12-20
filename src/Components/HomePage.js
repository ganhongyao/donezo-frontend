import React from 'react';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	today: {
		margin: '0 auto',
		
	}
}));

export default function ComponentName() {
    const classes = useStyles();

    return (
        <div className={classes.today}>
            
        </div>
    )
}