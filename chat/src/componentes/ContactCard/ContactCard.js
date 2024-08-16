import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import { mdiAccount, mdiDotsVertical, mdiMessageText } from '@mdi/js';
import Button from 'react-bootstrap/Button';
import './ContactCard.css';
import ContactInfo from '../ContactInfo/ContactInfo';
import ChatContainer from '../ChatContainer/ChatContainer';

function ContactCard({ contact }) {
    const [openInfo, setOpenInfo] = useState(false);
    const [openChat, setOpenChat] = useState(false); // Estado para controlar la visibilidad del ChatContainer

    const handleOpenInfo = () => {
        setOpenInfo(true);
    };

    const handleCloseInfo = () => {
        setOpenInfo(false);
    };

    const handleOpenChat = () => {
        setOpenChat(true); // Abre el chat
    };

    const handleCloseChat = () => {
        setOpenChat(false); // Cierra el chat
    };

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
                    <div id="contactCardOptions">
                        <Icon path={mdiAccount} size={1} color='#000000' />
                        <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleOpenInfo}>
                            <Icon path={mdiDotsVertical} size={1} color='#000000' />
                        </Button>
                    </div>
                    <div id="contactCardOptions">
                        <Card.Title>{contact.name}</Card.Title>
                        <Button 
                            style={{ backgroundColor: "transparent", border: "none" }} 
                            onClick={handleOpenChat} // Maneja el clic para abrir el chat
                        >
                            <Icon path={mdiMessageText} size={1} color='#000000' />
                        </Button>
                    </div>
                    <Card.Text>
                        {traducirEstado(contact.status)}
                    </Card.Text>
                </Card.Body>
            </Card>

            <ContactInfo handleOpen={openInfo} handleClose={handleCloseInfo} contact={contact} />

            {openChat && ( // Condicionalmente renderiza ChatContainer
                <ChatContainer 
                    userChat={contact.name} 
                    handleCloseChat={handleCloseChat} // Pasar función para cerrar chat
                />
            )}
        </div>
    );
}

export default ContactCard;
