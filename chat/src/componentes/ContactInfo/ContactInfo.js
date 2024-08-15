import React from 'react';
import './ContactInfo.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { mdiAccount } from '@mdi/js';
import Icon from '@mdi/react';
import CloseButton from 'react-bootstrap/esm/CloseButton';

function ContactInfo({ handleOpen, handleClose, contact }) {
    return (
        <div id='ContactInfoDialog'>
            <Dialog open={handleOpen} onClose={handleClose}>
                <DialogTitle>
                    <div id="contactInfoHeader">
                        <h5>{contact.name}</h5>
                        <CloseButton onClick={handleClose} />
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div id='contactInfoImage'>
                        <Icon path={mdiAccount} size={3} color='#000000' />
                    </div>
                    <div id="contactInfoBody">
                        <p>usuario de alumchat: {contact.jid}</p>
                        <p>Estado: {contact.customStatus}</p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ContactInfo;