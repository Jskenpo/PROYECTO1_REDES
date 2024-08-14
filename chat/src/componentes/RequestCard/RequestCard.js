import React from "react";
import "./RequestCard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function RequestCard({ request, handleAccept, handleReject }) {
    return (
        <div id="requestCard">
            <Card>
                <Card.Body>
                    <Card.Title>Solicitud de amistad</Card.Title>
                    <Card.Text>
                        <p>{request.from}</p>
                        <p>{request.message}</p>
                    </Card.Text>
                    <div className="d-flex justify-content-around">
                        <Button variant="success" onClick={handleAccept}>Aceptar</Button>
                        <Button variant="danger" onClick={handleReject}>Rechazar</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default RequestCard;
