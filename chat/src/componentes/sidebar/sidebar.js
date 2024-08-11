import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import Button from 'react-bootstrap/esm/Button';
import { mdiMessagePlusOutline, mdiCog, mdiContacts, mdiLogout } from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import { client, xml } from '@xmpp/client';
import './sidebar.css';
import SettingsDialog from '../SettingsDialog/SettingsDialog';

function Sidebar() {
    const [openSettings, setOpenSettings] = useState(false);
    const [xmppClient, setXmppClient] = useState(null);
    const navigate = useNavigate();
    
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
                // Ahora el usuario está conectado, se puede enviar la presencia
                const presence = xml('presence', {}, xml('show', {}, 'chat'), xml('status', {}, 'Disponible'));
                xmpp.send(presence);
            });

            xmpp.start().catch(err => {
                console.error('❌ Error al iniciar XMPP:', err.toString());
            });

            setXmppClient(xmpp);
        }
    }, []);

    const handleLogout = () => {
        if (xmppClient) {
            xmppClient.stop();
            console.log('🔴 Desconectado');
        }
        navigate('/', { replace: true });
        localStorage.removeItem('user');
        localStorage.removeItem('password');
    };

    const handleOpenSettings = () => {
        setOpenSettings(true);
    };

    const handleCloseSettings = () => {
        setOpenSettings(false);
    };
    
    return (
        <div id="sidebar">
            <Button style={{ backgroundColor: "transparent", border: "none" }} >
                <Icon path={mdiMessagePlusOutline} size={1} color='#000000' />
            </Button>
            <Button style={{ backgroundColor: "transparent", border: "none" }} >
                <Icon path={mdiContacts} size={1} color='#000000' />
            </Button>
            <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleOpenSettings}>
                <Icon path={mdiCog} size={1} color='#000000'/>
            </Button>
            <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleLogout} >
                <Icon path={mdiLogout} size={1} color='#000000'/>
            </Button>
            
            {/* Renderiza el SettingsDialog aquí */}
            <SettingsDialog open={openSettings} handleClose={handleCloseSettings} xmppClient={xmppClient} />
        </div>
    );
}

export default Sidebar;
