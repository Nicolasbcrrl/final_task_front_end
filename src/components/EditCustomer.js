import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

function EditCustomer(props){
    const [open, setOpen] = React.useState(false);
    const [customer , setCustomer] = React.useState({
        firstname:'',
        lastname:'',
        streetaddress:'',
        postcode:'',
        city:'',
        email:'',
        phone:''
    });

    const handleClickOpen = () => {
        setOpen(true);
        console.log(props.data);
        setCustomer({
            firstname: props.data.firstname,
            lastname: props.data.lastname,
            streetaddress: props.data.streetaddress,
            postcode: props.data.postcode,
            city: props.data.city,
            email: props.data.email,
            phone: props.data.phone
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.updateCustomer(customer, props.data.links[0].href);
        setOpen(false);
    };  

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First name"
                        fullWidth
                        value={customer.firstname}
                        onChange={e => setCustomer({...customer, firstname: e.target.value})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Last name"
                        fullWidth
                        value={customer.lastname}
                        onChange={e => setCustomer({...customer, lastname: e.target.value})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Address"
                        fullWidth
                        value={customer.streetaddress}
                        onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Postcode"
                        fullWidth
                        value={customer.postcode}
                        onChange={e => setCustomer({...customer, postcode: e.target.value})}
                    />                                        
                    <TextField
                        autoFocus
                        margin="dense"
                        label="City"
                        fullWidth
                        value={customer.city}
                        onChange={e => setCustomer({...customer, city: e.target.value})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email"
                        fullWidth
                        value={customer.email}
                        onChange={e => setCustomer({...customer, email: e.target.value})}
                    />       
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Phone"
                        fullWidth
                        value={customer.phone}
                        onChange={e => setCustomer({...customer, phone: e.target.value})}
                    />     
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>    
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>      
            </Dialog>
        </div>
    )

}
export default EditCustomer;