import React from "react";
import "./AlertsContainer.css";
import NewMessageAlert from "../NewMessageAlert/NewMessageAlert";
import { useXmppContext } from "../../paginas/context/XmppContext";

function AlertsContainer() {
    const { alerts, removeAlert } = useXmppContext(); // Obtén alertas y la función para remover alertas

    return (
        <div id="alertsContainer">
            {alerts.map((alert, index) => (
                <NewMessageAlert 
                    key={index} 
                    alert={alert} 
                    onClose={() => removeAlert(index)} // Pasar la función para cerrar la alerta
                />
            ))}
        </div>
    );
}

export default AlertsContainer;
