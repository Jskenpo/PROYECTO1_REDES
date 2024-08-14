import React from 'react';
import './NotificationsContainer.css';
import RequestCard from '../RequestCard/RequestCard';
import MessageCard from '../MessageCard/MessageCard';

function NotificationsContainer({ xmppClient }) {
    return (
        <div id='NotificationsContainer'>
            <RequestCard />

        </div>
    );
}

export default NotificationsContainer;