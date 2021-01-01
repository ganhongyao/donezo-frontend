import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Grid, IconButton, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles((theme) => ({
  root: {
    
  },

  createbutton: {
    '&:hover': {
      backgroundColor: '#00a152',
    },
  },

  select: {
    fontSize: '0.5em'
  },

  button: {
    marginTop: '8%',
    marginLeft: '15%'
  }




}));


export default function FormDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  return (
    <div className={classes.root}>
      <IconButton onClick={handleClickOpen} className={classes.button}>
        <AddCircleIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="createform" maxWidth="xs">
        <form onSubmit={props.addTask}>  
        <DialogTitle id="createform">Create new task</DialogTitle>
        <DialogContent>
          <TextField
            name="newTitle"
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            required
            variant="filled"
            onChange={props.handleChange}
          />
          <hr style={{border: 'white'}}/>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  id="duedate"
                  variant="inline"
                  label="Due Date"
                  format="MM/dd/yyyy"
                  InputAdornmentProps={{ position: "start" }}
                  onChange={props.handleDateChange}
                  value={props.defaultDate}
                  required
                />
              </MuiPickersUtilsProvider>
            <br/>
              <FormControl className={classes.formControl}>

                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                  Tag
                  </InputLabel>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  name='newTag'
                  value={props.newTag}
                  onChange={props.handleChange}
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  {props.tags.map(tag => <MenuItem value={tag.name}>{tag.name}</MenuItem>)}
                </Select>
              </FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            variant="filled"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained" onClick={handleClose} disabled={!props.canSubmit} className={classes.createbutton}>
            Create
          </Button>
        </DialogActions>
        </form>
        
      </Dialog>
    </div>
  );
}