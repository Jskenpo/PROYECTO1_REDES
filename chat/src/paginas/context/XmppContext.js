// XmppContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { xml } from '@xmpp/client';
const XmppContext = createContext();

export const XmppProvider = ({ xmppClient, children }) => {
    const [subscriptionRequests, setSubscriptionRequests] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        if (!xmppClient) return;

        xmppClient.on('stanza', (stanza) => {

            // Manejar las stanzas de presencia para suscripciones
            if (stanza.is('presence') && stanza.attrs.type === 'subscribe') {
                const from = stanza.attrs.from;
                const message = stanza.getChildText('status') || 'Solicitud de suscripción';

                setSubscriptionRequests(prevRequests => [
                    ...prevRequests,
                    { from, message }
                ]);
            }

            // Verifica las stanzas de IQ para obtener los contactos
            if (stanza.is('iq') && stanza.attrs.id === 'getRoster1' && stanza.attrs.type === 'result') {
                const query = stanza.getChild('query', 'jabber:iq:roster');
                if (!query) return;

                const contactsList = query.getChildren('item').map(item => ({
                    name: item.attrs.name || item.attrs.jid.split('@')[0],
                    jid: item.attrs.jid.split('/')[0],
                    status: 'Offline',
                    customStatus: ''
                }));

                setContacts(contactsList);

                // Agrega este log para verificar los contactos
                console.log('Contactos recibidos:', contactsList);
            }

            // Manejar la presencia de los contactos
            if (stanza.is('presence')) {
                const from = stanza.attrs.from.split('/')[0];
                const show = stanza.getChildText('show') || 'chat';
                const status = stanza.getChildText('status') || '';

                setContacts(prevContacts =>
                    prevContacts.map(contact =>
                        contact.jid === from ? { ...contact, status: show, customStatus: status } : contact
                    )
                );

                // Agrega este log para verificar la actualización de presencia
                console.log('Presencia actualizada:', from, show, status);
            }
        });

        // Solicita el roster cuando el cliente esté online
        xmppClient.on('online', async () => {
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
    }, [xmppClient]);

    return (
        <XmppContext.Provider value={{ xmppClient, subscriptionRequests, contacts }}>
            {children}
        </XmppContext.Provider>
    );
};

export const useXmppContext = () => useContext(XmppContext);
