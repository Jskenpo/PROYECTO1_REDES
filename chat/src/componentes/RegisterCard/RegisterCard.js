import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import X from '../../imas/X.png';
import React from 'react';
import './RegisterCard.css';
import { useNavigate } from "react-router-dom";

function RegisterCard() {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/', { replace: true });
    }

  return (
    <div id="registerCard">
        <Card border='info' style={{ width: '40%',
                                        height: '95vh',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '75%',
                                        transform: 'translate(-50%, -50%)' }}>
        <Card.Body>
            <Card.Header>
                <div id='RegisterHeader'>
                    <Card.Title>Registro</Card.Title>
                    <Button variant="outline-danger" size="sm" style= {{width: '25px',height: '25px'}} onClick={handleBack}>
                        <img src={X} alt="X" id="X"  />
                    </Button>
                </div>
                
            </Card.Header>
            <br/>
            <Card.Subtitle className="mb-2 text-muted">AlumChat.lol</Card.Subtitle>
                <Card.Text>
                    No tienes cuenta? llena los campos de abajo para registrarte!
                </Card.Text>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre  Completo</Form.Label>
                    <Form.Control type="text" placeholder="Ingresa tu nombre" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Ingresa tu nombre de usuario" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Confirma tu contraseña" />
                </Form.Group>
            </Form>
            <div className="d-grid gap-4">
                <Button variant="outline-info" size="md">
                    Registrate
                </Button>
                
            </div>
        </Card.Body>
        </Card>
    </div>
  );
}

export default RegisterCard;