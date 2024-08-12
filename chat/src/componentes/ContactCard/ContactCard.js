import React from 'react';
import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import './ContactCard.css';

function ContactCard({ contact }) {
    return (
        <Card id="contactCard">
            <Card.Body>
                <Icon path={mdiAccount} size={1} color='#000000' />
                <Card.Title>{contact.name}</Card.Title>
                <Card.Text>
                    {contact.jid}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ContactCard;
