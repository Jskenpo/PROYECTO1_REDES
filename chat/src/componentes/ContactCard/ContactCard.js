import React from 'react';
import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import './ContactCard.css';
import { mdiDotsVertical } from '@mdi/js';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import ContactInfo from '../ContactInfo/ContactInfo';


function ContactCard({ contact }) {
    const [openInfo, setOpenInfo] = useState(false);
    
    const handleOpenInfo = () => {
        setOpenInfo(true);
    };

    const handleCloseInfo = () => {
        setOpenInfo(false);
    };

    // Función para traducir el estado del contacto al español
    const traducirEstado = (status) => {
        switch (status) {
            case 'chat':
                return 'Disponible';
            case 'away':
                return 'Ausente';
            case 'xa':
                return 'No Disponible';
            case 'dnd':
                return 'Ocupado';
            default:
                return 'Offline';
        }
    };

    return (
        <div id="contactCard">
            <Card id="contactCard">
                <Card.Body>
                    <Icon path={mdiAccount} size={1} color='#000000' />
                    <div id="contactCardOptions">
                        <Card.Title>{contact.name}</Card.Title>
                        <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleOpenInfo}>
                            <Icon path={mdiDotsVertical} size={1} color='#000000' />
                        </Button>
                    </div>
                    <Card.Text>
                        {traducirEstado(contact.status)} {/* Mostrar la disponibilidad en español */}
                    </Card.Text>
                </Card.Body>
            </Card>

            <ContactInfo handleOpen={openInfo} handleClose={handleCloseInfo} contact={contact} />
        </div>
    );
}

export default ContactCard;
