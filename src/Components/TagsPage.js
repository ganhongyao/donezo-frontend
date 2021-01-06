import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from './Drawer'

const useStyles = makeStyles((theme) => ({

}));

export default function TagsPage() {
    const classes = useStyles();

    return (
        <div>
            <Drawer/>
        </div>
    )
}