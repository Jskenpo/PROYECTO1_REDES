import React, { useState } from 'react';
import Icon from '@mdi/react';
import Button from 'react-bootstrap/esm/Button';
import { mdiMessagePlusOutline, mdiCog, mdiContacts, mdiLogout } from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';
import SettingsDialog from '../SettingsDialog/SettingsDialog';

function Sidebar({ xmppClient }) {
    const [openSettings, setOpenSettings] = useState(false);
    const navigate = useNavigate();

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
