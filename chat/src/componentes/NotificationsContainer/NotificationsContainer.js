import React, { useState, useEffect } from 'react';
import './NotificationsContainer.css';
import RequestCard from '../RequestCard/RequestCard';
import { xml } from '@xmpp/client';

function NotificationsContainer({ xmppClient }) {
    const [subscriptionRequests, setSubscriptionRequests] = useState([]);

    useEffect(() => {
        if (!xmppClient) return;

        xmppClient.on('stanza', (stanza) => {
            console.log('🔄 Stanza recibida de notificaciones:', stanza.toString());

            if (stanza.is('presence') && stanza.attrs.type === 'subscribe') {
                const from = stanza.attrs.from;
                const message = stanza.getChildText('status') || 'Solicitud de suscripción';

                setSubscriptionRequests(prevRequests => [
                    ...prevRequests,
                    { from, message }
                ]);
            }
        });
    }, [xmppClient]);

    const handleAccept = (from) => {
        const acceptPresence = xml('presence', { to: from, type: 'subscribed' });
        xmppClient.send(acceptPresence);
        console.log('✅ Suscripción aceptada:', from);
    };

    const handleReject = (from) => {
        const rejectPresence = xml('presence', { to: from, type: 'unsubscribed' });
        xmppClient.send(rejectPresence);
        console.log('❌ Suscripción rechazada:', from);
    };

    return (
        <div id='NotificationsContainer'>
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
