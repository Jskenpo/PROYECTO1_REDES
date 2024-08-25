// XmppContext.js
import React, { createContext, useState, useEffect, useContext } from 'react'; 
import noti from '../../imas/noti.mp3'
import { xml } from '@xmpp/client';

const XmppContext = createContext();

export const XmppProvider = ({ xmppClient, children }) => {
    const [subscriptionRequests, setSubscriptionRequests] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [alerts, setAlerts] = useState([]); // Nuevo estado para alertas

    useEffect(() => {
        if (!xmppClient) return;

        xmppClient.on('stanza', (stanza) => {
            console.log('🔄 Stanza recibida:', stanza.toString());

            // Manejar las stanzas de presencia para suscripciones
            if (stanza.is('presence') && stanza.attrs.type === 'subscribe') {
                const from = stanza.attrs.from;
                const message = stanza.getChildText('status') || 'Solicitud de suscripción';
                setSubscriptionRequests(prevNotifications => {
                    const alreadyExists = prevNotifications.some(notification => notification.from === from);
                    if (!alreadyExists) {
                        return [...prevNotifications, { from, message }];
                    }
                    return prevNotifications;
                });
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
                console.log('Presencia actualizada:', from, show, status);
            }

            // Manejar mensajes
            if (stanza.is('message')) {
                console.log('📩 Stanza de tipo mensaje recibida');
            
                if (!stanza.attrs.type || stanza.attrs.type === 'chat' || stanza.attrs.type === 'normal') {
                    const from = stanza.attrs.from;
                    const body = stanza.getChildText('body');
                    const omemoEvent = stanza.getChild('event', 'http://jabber.org/protocol/pubsub#event');
                    const username = localStorage.getItem('user');
            
                    if (body) {
                        console.log('🟢 Mensaje de chat recibido:', body);
                        console.log('De:', from);
            
                        // Patrón para detectar archivos cifrados en Base64
                        const mimeTypePattern = /mime-type=([^ ]+)/;
                        const base64Pattern = /^([a-zA-Z0-9+/=]+)(?: mime-type=([^ ]+))?$/;
                        const base64Match = body.match(base64Pattern);
                        const mimeTypeMatch = body.match(mimeTypePattern);
            
                        if (base64Match && mimeTypeMatch) {
                            const base64Data = base64Match[1];
                            const mimeType = mimeTypeMatch[1];
            
                            console.log('📎 Archivo recibido:', base64Data);
                            console.log('📝 Tipo MIME:', mimeType);
            
                            const arrayBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
                            const blob = new Blob([arrayBuffer], { type: mimeType });
                            const downloadUrl = URL.createObjectURL(blob);
            
                            if (mimeType.startsWith('image/')) {
                                const imageUrl = downloadUrl;
                                setMessages(prevMessages => [...prevMessages, {
                                    host: username,
                                    contact: from.split('@')[0],
                                    emisor: from.split('@')[0],
                                    message: `Imagen recibida: ${imageUrl}`
                                }]);
                            } else {
                                setMessages(prevMessages => [...prevMessages, {
                                    host: username,
                                    contact: from.split('@')[0],
                                    emisor: from.split('@')[0],
                                    message: `Archivo recibido: ${downloadUrl}`
                                }]);
                            }
                            
                            setAlerts(prevAlerts => [...prevAlerts, { user: from.split('@')[0], message: 'Archivo recibido' }]);
                            const audio = new Audio(noti);
                            audio.play();
                        } else {
                            const message = {
                                host: username,
                                contact: from.split('@')[0],
                                emisor: from.split('@')[0],
                                message: body
                            };
            
                            setMessages(prevMessages => [...prevMessages, message]);
                            setAlerts(prevAlerts => [...prevAlerts, { user: from.split('@')[0], message: body }]);
                            const audio = new Audio(noti);
                            audio.play();
                        }
                    } else if (omemoEvent) {
                        console.log('🔒 Mensaje OMEMO recibido');
                        console.log('De:', from);
                    } else {
                        console.log('❌ Mensaje de chat recibido sin cuerpo');
                    }
                } else {
                    console.log('Mensaje recibido de tipo:', stanza.attrs.type);
                }
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

    // Función para enviar mensajes
    const sendMessage = async (to, body) => {
        try {

            const message = xml(
                'message',
                { type: 'chat', to: `${to}@alumchat.lol` },
                xml('body', {}, body)
            );
            await xmppClient.send(message);

            const username = localStorage.getItem('user');

            // Agrega el mensaje al estado local
            setMessages(prevMessages => [...prevMessages, { host: username, contact: to, emisor: username, message: body }]);
        } catch (err) {
            console.error('❌ Error al enviar el mensaje:', err.toString());
        }
    };

    const sendFileMessage = async (to, file) => {
        try {
            const reader = new FileReader();
            reader.onload = async () => {
                const base64Data = reader.result.split(',')[1]; // Obtener la parte base64 del archivo
                const mimeType = file.type;
                const fileStanza = xml(
                    'message',
                    { type: 'chat', to: `${to}@alumchat.lol` },
                    xml('body', { xmlns: 'urn:xmpp:bob', 'mime-type': mimeType }, `${base64Data} mime-type=${mimeType}`)
                );
    
                await xmppClient.send(fileStanza);
                console.log('🟢 Archivo codificado:', base64Data);
                const username = localStorage.getItem('user');
                setMessages(prevMessages => [...prevMessages, {
                    host: username,
                    contact: to,
                    emisor: username,
                    message: `Archivo enviado: ${file.name}`
                }]);
            };
            reader.readAsDataURL(file);
        } catch (err) {
            console.error('❌ Error al enviar archivo:', err.toString());
        }
    };

    const removeAlert = (index) => {
        setAlerts(prevAlerts => prevAlerts.filter((_, i) => i !== index));
    };

    const removeSubscriptionRequest = (from) => {
        setSubscriptionRequests(prevRequests => prevRequests.filter(request => request.from !== from));
    };

    return (
        <XmppContext.Provider value={{ xmppClient, 
        subscriptionRequests, 
        contacts, 
        messages, 
        sendMessage, 
        alerts, 
        removeAlert, 
        removeSubscriptionRequest, 
        sendFileMessage }}>

            {children}
            
        </XmppContext.Provider>
    );
};

export const useXmppContext = () => useContext(XmppContext);