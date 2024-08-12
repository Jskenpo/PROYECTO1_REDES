import React from "react";
import "./Contacts.css";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ContactsContainer from '../ContactContainer/ContactsContainer';

function Contacts({ xmppClient }) {
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
                                    className=" mr-sm-2"
                                    style={{ width: "300px" }}
                                />
                            </Col>
                            <Col xs="auto">
                                <Button variant="outline-info">Buscar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Navbar>
            </div>


            <ContactsContainer xmppClient={xmppClient} />
        </div>
    );
}

export default Contacts;