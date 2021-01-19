import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: '10%',
		flexShrink: 0,
		backgroundColor: 'red',
	},

	drawerPaper: {
		marginTop: '5%',
		width: '10%',
		height: '70%',
		backgroundColor: 'transparent',
		border: 'none',
		color: '#16c79a',
	},

	drawerContainer: {
		overflow: 'auto',
	},

}));

export default function ComponentName() {
	const classes = useStyles();

	return (
		<Drawer
		className={classes.drawer}
		variant="permanent"
		classes={{
			paper: classes.drawerPaper,
		}}
		>
			<Toolbar />
			<List className={classes.drawerContainer}>
				{['Home', '', 'Today', 'Calendar', 'Completed'].map((text, index) => 
					(text !== '' &&
					<ListItem button key={text} component={Link} to={`/${text}`}>
						<ListItemText primary={text} />
					</ListItem>
					))}
			</List>
		</Drawer>
  )
}
