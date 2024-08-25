import React, { useState } from 'react';
import Icon from '@mdi/react';
import Button from 'react-bootstrap/esm/Button';
import { mdiMessagePlusOutline, mdiCog, mdiBellBadgeOutline , mdiLogout, mdiDelete } from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';
import SettingsDialog from '../SettingsDialog/SettingsDialog';
import { xml } from '@xmpp/client';
import NewContact from '../NewContact/NewContact';
import NotificationsDialog from '../NotificationsDialog/NotificationsDialog';
import {useXmppContext} from '../../paginas/context/XmppContext';

function Sidebar( ) {
    const {xmppClient} = useXmppContext();
    const [openSettings, setOpenSettings] = useState(false);
    const [openContacts, setOpenContacts] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        if (xmppClient) {
            // Enviar presencia de tipo 'unavailable' antes de desconectarse
            const unavailablePresence = xml('presence', { type: 'offline' });
            xmppClient.send(unavailablePresence).then(() => {
                xmppClient.stop().then(() => {
                    console.log('🔴 Desconectado');
                    console.log('xmppClient:', xmppClient);
                    navigate('/', { replace: true });
                    localStorage.removeItem('user');
                    localStorage.removeItem('password');
                }).catch(err => {
                    console.error('❌ Error al detener el cliente XMPP:', err);
                });
            }).catch(err => {
                console.error('❌ Error al enviar presencia de desconexión:', err);
            });
        } else {
            // Si no hay cliente XMPP, simplemente redirige y limpia el almacenamiento
            navigate('/', { replace: true });
            localStorage.removeItem('user');
            localStorage.removeItem('password');
        }
    };
    

    const handleOpenSettings = () => {
        setOpenSettings(true);
    };

    const handleCloseSettings = () => {
        setOpenSettings(false);
    };

    const handleOpenContacts = () => {
        setOpenContacts(true);
    }

    const handleCloseContacts = () => {
        setOpenContacts(false);
    }

    const handleOpenNotifications = () => {
        setOpenNotifications(true);
    }

    const handleCloseNotifications = () => {
        setOpenNotifications(false);
    }

    return (
        <div id="sidebar">
            <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleOpenContacts} >
                <Icon path={mdiMessagePlusOutline} size={1} color='#000000' />
            </Button>
            <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleOpenNotifications} >
                <Icon path={mdiBellBadgeOutline } size={1} color='#000000' />
            </Button>
            <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleOpenSettings}>
                <Icon path={mdiCog} size={1} color='#000000'/>
            </Button>
            <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleLogout} >
                <Icon path={mdiDelete} size={1} color='#000000'/>
            </Button>
            <Button style={{ backgroundColor: "transparent", border: "none" }} onClick={handleLogout} >
                <Icon path={mdiLogout} size={1} color='#000000'/>
            </Button>
            
            {/* Renderiza el SettingsDialog aquí */}
            <SettingsDialog open={openSettings} handleClose={handleCloseSettings} xmppClient={xmppClient} />

            {/* Renderiza el ContactsDialog aquí */}
            <NewContact open={openContacts} handleClose={handleCloseContacts} xmppClient={xmppClient} />

            {/* Renderiza el NotificationsDialog aquí */}
            <NotificationsDialog open={openNotifications} handleClose={handleCloseNotifications} xmppClient={xmppClient} />
            
        </div>
    );
}

export default Sidebar;
