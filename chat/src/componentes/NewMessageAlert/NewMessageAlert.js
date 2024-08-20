import Alert from 'react-bootstrap/Alert';
import React from 'react';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import "./NewMessageAlert.css";

function NewMessageAlert({ alert, onClose }) {
    return (
        <div id='NewMessageAlert'>
            <Alert variant='info' style={{ display: 'flex', justifyContent: 'space-between' }}>
                Nuevo mensaje de {alert.user}
                <CloseButton onClick={onClose} />
            </Alert>
        </div>
    );
}

export default NewMessageAlert;
