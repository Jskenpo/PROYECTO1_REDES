import React from "react";
import "./ContactMessage.css";

function ContactMessage({ message }) {
    return (
        <div id="contactMessage">
            <div id="messageContainer">
                    <h6>{message.contact}</h6>
                    <p>{message.message}</p>
            </div>
        </div>
    );
}

export default ContactMessage;