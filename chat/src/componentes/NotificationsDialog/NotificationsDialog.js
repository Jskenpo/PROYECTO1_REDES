import React from 'react';
import './NotificationsDialog.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import NotificationsContainer from '../NotificationsContainer/NotificationsContainer';

function NotificationsDialog({ open, handleClose, xmppClient }) {
    return (
        <div id='NotificationsDialog'>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                
            >
                <DialogTitle>Notificaciones</DialogTitle>
                <DialogContent>
                    <NotificationsContainer xmppClient={xmppClient} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NotificationsDialog;