import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function NContact({open, handleClose, xmppClient}) {


    return (
        <div id='NCDialog'>
            <Dialog 
            open={open} 
            onClose={handleClose}
            >
                <DialogTitle>Añadir contacto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Introduce el nombre de usuario del contacto que deseas añadir.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre de usuario"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose}>Añadir</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NContact;