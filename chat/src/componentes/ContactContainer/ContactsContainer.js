import React from 'react';
import './ContactsContainer.css';
import ContactCard from '../ContactCard/ContactCard';


function ContactsContainer({ xmppClient }) {
    const users = [ { jid: { local: 'user1', domain: 'alumchat.lol' } }, { jid: { local: 'user2', domain: 'alumchat.lol' } }, { jid: { local: 'user3', domain: 'alumchat.lol' } } ];
    return (

        <div id="contactsContainer">
            {users.map((user, index) => {
                return <ContactCard key={index} contact={user} />;
            }
            )}
            


        </div>

    );
}

export default ContactsContainer;