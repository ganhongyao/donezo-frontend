import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Grid, IconButton, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles((theme) => ({
  actionicon: {
    fill: 'black'
  }

}));


export default function EditTodoForm(props) {
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
        <EditIcon className={classes.actionicon}/>
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="createform" maxWidth="xs">
        <form onSubmit={props.handleEdit}>  
        <DialogTitle id="createform">Edit task</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            required
            variant="filled"
            onChange={props.handleChange}
            defaultValue={props.todo.title}
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
                  required
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
                  name='newTag'
                  value={props.defaultTag}
                  onChange={props.handleChange}
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
          <Button type="submit" color="primary" variant="contained" onClick={handleClose} disabled={!props.canEdit} className={classes.createbutton}>
            Edit
          </Button>
        </DialogActions>
        </form>
        
      </Dialog>
    </div>
  );
}