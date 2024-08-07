import React from "react";
import "./home.css";

function Home() {
    return (
        <div className="home">
        <div className="home__container">
           
            <div className="home__text">
            <h1>Sign in to WhatsApp</h1>
            </div>
            <Button onClick={signIn}>Sign in with Google</Button>
        </div>
        </div>
    );
    }
