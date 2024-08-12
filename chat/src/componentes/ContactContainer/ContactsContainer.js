import React, { useState, useEffect } from 'react';
import './ContactsContainer.css';
import ContactCard from '../ContactCard/ContactCard';
import { xml } from '@xmpp/client';

function ContactsContainer({ xmppClient,filteredContacts }) {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        if (xmppClient) {
            xmppClient.on('stanza', (stanza) => {
                console.log('🔄 Stanza recibida:', stanza.toString());

                if (stanza.is('iq') && stanza.attrs.id === 'getRoster1' && stanza.attrs.type === 'result') {
                    const query = stanza.getChild('query', 'jabber:iq:roster');
                    if (!query) {
                        console.error('❌ No se encontró el elemento <query> en la respuesta.');
                        return;
                    }

                    const contactsList = query.getChildren('item').map(item => ({
                        name: item.attrs.name || item.attrs.jid.split('@')[0],
                        jid: item.attrs.jid,
                        status: 'Offline'
                    }));

                    console.log('Contacts:', contactsList);
                    setContacts(contactsList);
                }

                // Manejar la presencia de los contactos
                if (stanza.is('presence')) {
                    const from = stanza.attrs.from;
                    const show = stanza.getChildText('show') || 'chat';
                    const status = stanza.getChildText('status') || '';

                    setContacts(prevContacts =>
                        prevContacts.map(contact =>
                            contact.jid === from ? { ...contact, status: show, customStatus: status } : contact
                        )
                    );
                }
            });

            xmppClient.on('online', async () => {
                console.log('🟢 Conectado como', xmppClient.jid.toString());

                try {
                    const getRosterIQ = xml(
                        'iq',
                        { type: 'get', id: 'getRoster1' },
                        xml('query', { xmlns: 'jabber:iq:roster' })
                    );

                    await xmppClient.send(getRosterIQ);
                } catch (err) {
                    console.error('❌ Error al enviar IQ para obtener el roster:', err.toString());
                }
            });
        }
    }, [xmppClient]);

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
