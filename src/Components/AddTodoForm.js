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


export default function FormDialog() {
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
                    // value={selectedDate}
                    InputAdornmentProps={{ position: "start" }}
                    // onChange={date => handleDateChange(date)}
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
                    // value={age}
                    // onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>School</MenuItem>
                    <MenuItem value={20}>Fitness</MenuItem>
                    <MenuItem value={30}>Misc</MenuItem>
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
          <Button onClick={handleClose} color="primary" variant="contained" className={classes.createbutton}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}