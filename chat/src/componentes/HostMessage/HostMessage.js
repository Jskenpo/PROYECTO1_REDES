import React from "react";
import "./HostMessage.css";

function HostMessage({ message }) {
    return (
        <div id="hostMessage">
            <div id="messageHContainer">
                <h6>{message.host}</h6>
                <p>{message.message}</p>
            </div>
        </div>
    );
}


export default HostMessage;
