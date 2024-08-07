import React from "react";
import "./login.css";
import LoginCard from "../../componentes/LoginCard/LoginCard";

function Login() {
    return (
    <div className="login">
        <div className="login__container">
            <LoginCard/>
        </div>
    </div>
    );
    }

export default Login;