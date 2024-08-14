import React from "react";
import "./RequestCard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function RequestCard({ request, handleAccept, handleReject }) {

    const exampleRequest = {
        from: "user@localhost",
        message: "Hola, ¿me aceptas?",
    };

    return (
        <div id="requestCard">
            <Card>
                <Card.Body>
                    <Card.Title>Solicitud de amistad</Card.Title>
                    <Card.Text>
                        <p>{exampleRequest.from}</p>
                        <p>{exampleRequest.message}</p>
                    </Card.Text>
                    <Button variant="success" onClick={handleAccept}>Aceptar</Button>
                    <Button variant="danger" onClick={handleReject}>Rechazar</Button>
                </Card.Body>
            </Card>
        </div>
    );
    }


export default RequestCard;

