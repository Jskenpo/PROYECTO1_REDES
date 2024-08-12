import React, { useState, useEffect } from 'react';
import './ContactsContainer.css';
import ContactCard from '../ContactCard/ContactCard';
import { xml } from '@xmpp/client';

function ContactsContainer({ xmppClient, filteredContacts }) {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        if (xmppClient) {
            xmppClient.on('stanza', (stanza) => {
                if (stanza.is('iq') && stanza.attrs.id === 'getRoster1' && stanza.attrs.type === 'result') {
                    const query = stanza.getChild('query', 'jabber:iq:roster');
                    if (!query) {
                        return;
                    }

                    const contactsList = query.getChildren('item').map(item => ({
                        name: item.attrs.name || item.attrs.jid.split('@')[0],
                        jid: item.attrs.jid,
                        status: 'Offline'
                    }));

                    setContacts(contactsList);
                }
            });

            xmppClient.on('online', async () => {
                const getRosterIQ = xml(
                    'iq',
                    { type: 'get', id: 'getRoster1' },
                    xml('query', { xmlns: 'jabber:iq:roster' })
                );

                await xmppClient.send(getRosterIQ);
            });
        }
    }, [xmppClient]);

    // Si hay contactos filtrados, mostrar esos. Si no, mostrar la lista completa.
    const contactsToDisplay = filteredContacts.length > 0 ? filteredContacts : contacts;

    return (
        <div id="contactsContainer">
            {contactsToDisplay.map((contact, index) => (
                <ContactCard key={index} contact={contact} />
            ))}
        </div>
    );
}

export default ContactsContainer;
