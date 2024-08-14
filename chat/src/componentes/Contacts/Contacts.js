import React, { useState } from "react";
import "./Contacts.css";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ContactsContainer from '../ContactContainer/ContactsContainer';
import { xml } from '@xmpp/client';
import { mdiRefresh } from "@mdi/js";
import Icon from "@mdi/react";

function Contacts({ xmppClient }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);

    const handleSearch = () => {
        if (xmppClient && searchTerm.trim()) {
            xmppClient.once('stanza', (stanza) => {
                const query = stanza.getChild('query', 'jabber:iq:roster');
                if (query) {
                    const contactsList = query.getChildren('item').map(item => ({
                        name: item.attrs.name || item.attrs.jid.split('@')[0],
                        jid: item.attrs.jid
                    }));

                    const filtered = contactsList.filter(contact => 
                        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        contact.jid.toLowerCase().includes(searchTerm.toLowerCase())
                    );

                    setFilteredContacts(filtered);
                }
            });

            const getRosterIQ = xml(
                'iq',
                { type: 'get', id: 'getRoster1' },
                xml('query', { xmlns: 'jabber:iq:roster' })
            );

            xmppClient.send(getRosterIQ);
        }
    };

    return (
        <div id="contacts">
            <div id="contactsHeader">
                <Navbar className="bg-body-tertiary justify-content-center" >
                    <Form inline>
                        <Row>
                            <Col lg="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre del contacto"
                                    className="mr-sm-2"
                                    style={{ width: "300px" }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Col>
                            <Col xs="auto">
                                <Button variant="outline-info" onClick={handleSearch}>Buscar</Button>
                            </Col>
                            <Col xs="auto">
                                <Button variant="outline-info"  onClick={() => setFilteredContacts([])}>
                                    <Icon path={mdiRefresh} size={1} color="#000000" />
                                </Button>
                            </Col>

                        </Row>
                    </Form>
                </Navbar>
            </div>

            <ContactsContainer xmppClient={xmppClient} filteredContacts={filteredContacts} />
        </div>
    );
}

export default Contacts;
