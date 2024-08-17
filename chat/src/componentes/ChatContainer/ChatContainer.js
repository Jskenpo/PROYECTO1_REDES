import React, { useEffect, useRef } from 'react';
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
    const { messages } = useXmppContext(); // Obtén los mensajes del contexto
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]); // Ajusta el scroll cuando los mensajes cambian

    return (
        <div id="chatContainer">
            <div id="chatHeader">
                <h5>{userChat}</h5>
                <CloseButton onClick={handleCloseChat} />
            </div>

            <div id="chatMessages" ref={chatMessagesRef}>
                {messages.map((msg, index) => 
                    msg.name === userChat ? 
                        <ContactMessage key={index} message={msg} /> : 
                        <HostMessage key={index} message={msg} />
                )}
            </div>

            <div id="chatInput">
                <Button style={{ backgroundColor: "transparent", border: "none" }}>
                    <Icon path={mdiPaperclip} size={1} color='#000000' />
                </Button>

                <TextField id="outlined-basic" label="Escribe un mensaje" variant="outlined" style={{ width: '80%' }} />

                <Button style={{ backgroundColor: "transparent", border: "none" }}>
                    <Icon path={mdiSend} size={1} color='#000000' />
                </Button>
            </div>
        </div>
    );
}

export default ChatContainer;