// chat.js
import React, { useState, useEffect } from 'react';
import './chat.css';
import Sidebar from '../../componentes/sidebar/sidebar';
import Contacts from '../../componentes/Contacts/Contacts';
import { client, xml } from '@xmpp/client';
import { XmppProvider } from '../context/XmppContext';  // Importa el contexto

function Chat() {
    const [xmppClient, setXmppClient] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const password = localStorage.getItem('password');

        if (user && password) {
            const xmpp = client({
                service: 'ws://alumchat.lol:7070/ws/',
                domain: 'alumchat.lol',
                username: user,
                password: password,
            });

            xmpp.on('error', err => {
                console.error('❌ Error:', err.toString());
            });

            xmpp.on('online', address => {
                console.log('🟢 Conectado como', address.toString());
                const presence = xml('presence', {}, xml('show', {}, 'chat'), xml('status', {}, 'Disponible'));
                xmpp.send(presence);
            });

            xmpp.start().catch(err => {
                console.error('❌ Error al iniciar XMPP:', err.toString());
            });

            setXmppClient(xmpp);
        }
    }, []);

    return (
        <XmppProvider xmppClient={xmppClient}>
            <div id="chat">
                <Sidebar />
                <Contacts />
            </div>
        </XmppProvider>
    );
}

export default Chat;
