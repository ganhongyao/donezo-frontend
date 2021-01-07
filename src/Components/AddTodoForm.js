import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Grid, IconButton, InputLabel, makeStyles, MenuItem, Tooltip } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
  },

  autocomplete: {
    width: '300px'
  },





}));


export default function FormDialog(props) {
  const classes = useStyles();

  const options = props.tags.map(tag => {
    tag.label = tag.name;
    tag.value = tag.name;
    return tag;
  })

  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  return (
    <div className={classes.root}>
      <Tooltip title="Create new task" placement="right">
        <IconButton onClick={handleClickOpen} className={classes.button}>
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="createform" maxWidth="xs" scroll={'body'}>
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
              <FormControl>                
              <Autocomplete
                multiple
                id="tags-filled"
                options={props.tags.map((option) => option.name)}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} size="small" {...getTagProps({ index })} />
                  ))
                
                }
                renderInput={(params) => (
                  <TextField {...params} variant="filled" label="Tags" placeholder="Type to create new tag"/>
                )}
                className={classes.autocomplete}
                onChange={props.handleTagChange}
              />
              </FormControl>
              

          <TextField
            autoFocus
            margin="dense"
            name="newDescription"
            label="Description"
            fullWidth
            variant="filled"
            onChange={props.handleChange}
            multiline
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