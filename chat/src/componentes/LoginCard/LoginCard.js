import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import './LoginCard.css';
import Logo from '../../imas/logo.jpeg';
import { useNavigate } from "react-router-dom";


function LoginCard() {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate('/register', { replace: true });
  }

  return (
    <div id="loginCard">
      <div id = 'DivLogo'>
        <img src={Logo} alt="Logo" id="Logo" />
        <h1 id = 'LoginTitulo'>XMPP Client Chat</h1>
      </div>
      
      <div id = 'DivFormLogin'>
        <Form>
        <h2>Bienvenido a AlumChat.lol</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>
          <div className="d-grid gap-4">
            <Button variant="info" size="md">
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