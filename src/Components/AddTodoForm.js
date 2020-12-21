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
    position: 'fixed'
  },

  createbutton: {
    '&:hover': {
      backgroundColor: '#00a152',
    }
  },

  select: {
    fontSize: '0.5em'
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
      <IconButton onClick={handleClickOpen}>
        <AddCircleIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="createform" maxWidth="xs">
        <form onSubmit={props.addTask}>  
        <DialogTitle id="createform">Create new task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            required
            variant="filled"
            onChange={props.handleTitleChange}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>

                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                  Tag
                  </InputLabel>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value={props.defaultTag}
                  onChange={props.handleTagChange}
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'School'}>School</MenuItem>
                  <MenuItem value={'Fitness'}>Fitness</MenuItem>
                  <MenuItem value={'Misc'}>Misc</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

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
          <Button type="submit" color="primary" variant="contained" onClick={handleClose} className={classes.createbutton}>
            Create
          </Button>
        </DialogActions>
        </form>
        
      </Dialog>
    </div>
  );
}