import React from 'react';
import './NotificationsContainer.css';
import RequestCard from '../RequestCard/RequestCard';
import { xml } from '@xmpp/client';
import { useXmppContext } from '../../paginas/context/XmppContext';

function NotificationsContainer() {
    const { xmppClient, subscriptionRequests, removeSubscriptionRequest } = useXmppContext();

    const handleAccept = (from) => {
        const acceptPresence = xml('presence', { to: from, type: 'subscribed' });
        xmppClient.send(acceptPresence);
        console.log('✅ Suscripción aceptada:', from);
        removeSubscriptionRequest(from); // Eliminar la solicitud aceptada
    };

    const handleReject = (from) => {
        const rejectPresence = xml('presence', { to: from, type: 'unsubscribed' });
        xmppClient.send(rejectPresence);
        console.log('❌ Suscripción rechazada:', from);
        removeSubscriptionRequest(from); // Eliminar la solicitud rechazada
    };

    return (
        <div id="NotificationsContainer">
            {subscriptionRequests.length === 0 ? (
                <p>No hay notificaciones de suscripción.</p>
            ) : (
                subscriptionRequests.map((request, index) => (
                    <RequestCard
                        key={index}
                        request={request}
                        handleAccept={() => handleAccept(request.from)}
                        handleReject={() => handleReject(request.from)}
                    />
                ))
            )}
        </div>
    );
}

export default NotificationsContainer;
