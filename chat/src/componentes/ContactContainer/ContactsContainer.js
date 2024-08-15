import React from 'react';
import { useXmppContext } from '../../paginas/context/XmppContext';  // Importa el contexto
import ContactCard from '../ContactCard/ContactCard';
import './ContactsContainer.css';

function ContactsContainer({ filteredContacts }) {
    const { contacts } = useXmppContext();  // Accede a los contactos desde el contexto

    const displayedContacts = filteredContacts.length > 0 ? filteredContacts : contacts;

    return (
        <div id="contactsContainer">
            {displayedContacts.length > 0 ? (
                displayedContacts.map((contact, index) => (
                    <ContactCard key={index} contact={contact} />
                ))
            ) : (
                <p>No contacts found.</p>
            )}
        </div>
    );
}

export default ContactsContainer;
