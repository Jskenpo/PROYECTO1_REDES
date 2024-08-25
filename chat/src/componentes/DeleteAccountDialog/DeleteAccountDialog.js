import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import React from 'react';
import './DeleteAccountDialog.css';

function DeleteAccountDialog({ open, handleClose }) {
    return (
        <div id='DeleteAccountDialog'>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
            >
                <DialogTitle>Eliminar cuenta</DialogTitle>
                <DialogContent>
                    <p>¿Estás seguro de que deseas eliminar tu cuenta?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteAccountDialog;