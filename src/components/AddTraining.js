import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: null,
        activity: '',
        duration: '',
        customer: props.data.links[0].href
    });

    const handleClickOpen = () => {
        setOpen(true);
        setTraining({...training, date: null, activity: '', duration: ''});
    };

    const handleClose = () => {
        setOpen(false);
        
    };

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" variant="text" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add training</DialogTitle>
                <DialogContent> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={training.date}
                            onChange={(newValue)=>{
                                setTraining({...training, date: newValue.toISOString()});
                                }
                            }
                            renderInput={(params) => 
                                <TextField 
                                    autoFocus
                                    label="Date"
                                    fullWidth
                                    {...params}
                                />
                            }
                        />
                    </LocalizationProvider>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Activity"
                        fullWidth
                        value={training.activity}
                        onChange={e => setTraining({...training, activity: e.target.value})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Duration"
                        fullWidth
                        value={training.duration}
                        onChange={e => setTraining({...training, duration: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTraining;