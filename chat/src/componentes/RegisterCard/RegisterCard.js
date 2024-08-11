import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import './RegisterCard.css';
import { useNavigate } from "react-router-dom";
import { client, xml } from '@xmpp/client';


function RegisterCard() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/', { replace: true });
    }

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Inicia sesión con las credenciales hard-coded
        const adminUsername = 'san21153-test';
        const adminPassword = 'jose1533';

        const xmppClient = client({
            service: 'ws://alumchat.lol:7070/ws/',
            domain: 'alumchat.lol',
            username: adminUsername,
            password: adminPassword,
        });

        xmppClient.on('error', err => {
            console.error('❌', err.toString());
        });

        xmppClient.on('online', async address => {
            console.log('🟢', 'Admin online as', address.toString());

            // Crea la cuenta del nuevo usuario
            try {
                const registerIq = xml(
                    'iq',
                    { type: 'set', id: 'register1' },
                    xml('query', { xmlns: 'jabber:iq:register' }, [
                        xml('username', {}, username),
                        xml('password', {}, password),
                        xml('email', {}, email),
                        xml('name', {}, fullName),
                    ])
                );
                await xmppClient.send(registerIq);
                console.log('🟢 Nuevo usuario registrado:', username);
                alert("Usuario registrado exitosamente");
                navigate('/', { replace: true });
            } catch (err) {
                console.error('❌ Error al registrar el usuario:', err.toString());
                alert("Error al registrar el usuario");
            } finally {
                xmppClient.stop();
            }
        });

        try {
            await xmppClient.start();
        } catch (err) {
            console.error('❌', err.toString());
        }
    };

    return (
        <div id="registerCard">
            <Card border='info' style={{ width: '40%', height: '95vh', position: 'absolute', top: '50%', left: '75%', transform: 'translate(-50%, -50%)' }}>
                <Card.Body>
                    <Card.Header>
                        <div id='RegisterHeader'>
                            <Card.Title>Registro</Card.Title>
                            <CloseButton size="sm" style={{ width: '25px', height: '25px' }} onClick={handleBack} />
                        </div>
                    </Card.Header>
                    <br />
                    <Card.Subtitle className="mb-2 text-muted">AlumChat.lol</Card.Subtitle>
                    <Card.Text>
                        No tienes cuenta? Llena los campos de abajo para registrarte!
                    </Card.Text>
                    <Form>
                        <Form.Group className="mb-3" controlId="formFullName">
                            <Form.Label>Nombre Completo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa tu nombre"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Nombre de Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa tu nombre de usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirma tu contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <div className="d-grid gap-4">
                        <Button variant="outline-info" size="md" onClick={handleRegister}>
                            Registrate
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default RegisterCard;
