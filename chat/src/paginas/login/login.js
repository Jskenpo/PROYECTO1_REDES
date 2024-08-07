import React from "react";
import "./login.css";

function Login() {
    return (
        <div className="login">
        <div className="login__container">
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png"
            alt=""
            />
            <div className="login__text">
            <h1>Sign in to WhatsApp</h1>
            </div>
            <Button onClick={signIn}>Sign in with Google</Button>
        </div>
        </div>
    );
    }

export default Login;