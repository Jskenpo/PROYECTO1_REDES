import React from 'react';
import Icon from '@mdi/react';
import Button from 'react-bootstrap/esm/Button';
import {  mdiMessagePlusOutline, mdiCog, mdiContacts, mdiLogout } from '@mdi/js';

import './sidebar.css';

function Sidebar() {

    
    
    return (
        <div id="sidebar">
            <Button style={{ backgroundColor: "transparent", border: "none" }} >
                <Icon path={mdiMessagePlusOutline} size={1} color='#000000' />
            </Button>
            <Button style={{ backgroundColor: "transparent", border: "none" }} >
                <Icon path={mdiContacts} size={1} color='#000000' />
            </Button>
            <Button style={{ backgroundColor: "transparent", border: "none" }} >
                <Icon path={mdiCog} size={1} color='#000000'/>
            </Button>
            <Button style={{ backgroundColor: "transparent", border: "none" }} >
                <Icon path={mdiLogout} size={1} color='#000000'/>
            </Button>
            
        </div>
    );
}

export default Sidebar;