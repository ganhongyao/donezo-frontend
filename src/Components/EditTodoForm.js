import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Grid, IconButton, InputLabel, makeStyles, MenuItem, Select, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';



const useStyles = makeStyles((theme) => ({
  actionicon: {
    fill: 'black'
  },

  autocomplete: {
    width: '300px'
  },

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
      <Tooltip title="Edit" arrow>
        <IconButton onClick={handleClickOpen}>
          <EditIcon className={classes.actionicon}/>
        </IconButton>
      </Tooltip>
      
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
                defaultValue={props.todo.tags_list}
              />
              </FormControl>

          <TextField
            autoFocus
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            variant="filled"
            onChange={props.handleChange}
            multiline
            defaultValue={props.todo.description}
          />

          <FormControl>                 
            <Autocomplete
              multiple
              options={[]}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} size="small" {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} variant="filled" label="Who are you working on this with?" placeholder="Enter names" />
              )}
              className={classes.autocomplete}
              onChange={props.handleCollaboratorsChange}
              defaultValue={props.todo.collaborators}
            />
          </FormControl>

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