import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './LoginCard.css';
import Logo from '../../imas/logo.jpeg';
import { useNavigate } from "react-router-dom";
import { client } from '@xmpp/client';

function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register', { replace: true });
  }

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, ingresa tu correo electrónico y contraseña.");
      return;
    }

    const xmppClient = client({
      service: 'ws://alumchat.lol:7070/ws/',
      domain: 'alumchat.lol',
      username: email,
      password: password,
    });

    xmppClient.on('error', err => {
      console.error('❌', err.toString());
    });

    xmppClient.on('online', address => {
      console.log('🟢', 'online as', address.toString());
      navigate('/chat', { replace: true });
      localStorage.setItem('user', email);
      localStorage.setItem('password', password);
    });

    try {
      await xmppClient.start();
    } catch (err) {
      console.error('❌', err.toString());
    }
  };

  return (
    <div id="loginCard">
      <div id='DivLogo'>
        <img src={Logo} alt="Logo" id="Logo" />
        <h1 id='LoginTitulo'>XMPP Client Chat</h1>
      </div>
      
      <div id='DivFormLogin'>
        <Form>
          <h2>Bienvenido a AlumChat.lol</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-4">
            <Button variant="info" size="md" onClick={handleLogin}>
              Log In
            </Button>
            <h5>¿No tienes cuenta? Registrate!</h5>
            <Button variant="outline-primary" size="md" onClick={handleRegister}>
              Registrate
            </Button>
          </div>
        </Form>
      </div> 
    </div>
  );
}

export default LoginCard;
