import React, { useState, useEffect, useRef } from 'react';
import './ChatContainer.css';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import TextField from '@mui/material/TextField';
import Icon from '@mdi/react';
import { mdiPaperclip, mdiSend } from '@mdi/js';
import Button from 'react-bootstrap/Button';
import ContactMessage from '../ContactMessage/ContactMessage';
import HostMessage from '../HostMessage/HostMessage';
import { useXmppContext } from '../../paginas/context/XmppContext'; // Importa el contexto

function ChatContainer({ userChat, handleCloseChat }) {
    const { messages, sendMessage } = useXmppContext(); // Obtén mensajes y la función de envío del contexto
    const [inputMessage, setInputMessage] = useState('');
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]); // Ajusta el scroll cuando los mensajes cambian

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            sendMessage(userChat, inputMessage); // Envía el mensaje al usuario
            setInputMessage(''); // Limpia el campo de entrada
        }
    };

    // Filtra los mensajes para mostrar solo los que pertenecen al chat actual
    const filteredMessages = messages.filter(msg =>
        msg.name === userChat || msg.name === 'Tú'
    );

    return (
        <div id="chatContainer">
            <div id="chatHeader">
                <h5>{userChat}</h5>
                <CloseButton onClick={handleCloseChat} />
            </div>

            <div id="chatMessages" ref={chatMessagesRef}>
                {filteredMessages.map((msg, index) => 
                    msg.name === userChat ? 
                        <ContactMessage key={index} message={msg} /> : 
                        <HostMessage key={index} message={msg} />
                )}
            </div>

            <div id="chatInput">
                <Button style={{ backgroundColor: "transparent", border: "none" }}>
                    <Icon path={mdiPaperclip} size={1} color='#000000' />
                </Button>

                <TextField
                    id="outlined-basic"
                    label="Escribe un mensaje"
                    variant="outlined"
                    style={{ width: '80%' }}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />

                <Button
                    style={{ backgroundColor: "transparent", border: "none" }}
                    onClick={handleSendMessage}
                >
                    <Icon path={mdiSend} size={1} color='#000000' />
                </Button>
            </div>
        </div>
    );
}

export default ChatContainer;
