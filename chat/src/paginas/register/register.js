import React from "react";
import "./register.css";
import RegisterCard from "../../componentes/RegisterCard/RegisterCard";
import Logo from '../../imas/logo.jpeg';

function Register() {
    return (
    <div className="login">
        <div id = 'DivLogo'>
            <img src={Logo} alt="Logo" id="Logo" />
            <h1 id = 'LoginTitulo'>XMPP Client Chat</h1>
        </div>
        <RegisterCard />    
    </div>
    );
    }

export default Register;