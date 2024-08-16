import React from 'react';
import './ChatContainer.css';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import TextField from '@mui/material/TextField';
import Icon from '@mdi/react';
import { mdiPaperclip, mdiSend } from '@mdi/js';
import Button from 'react-bootstrap/Button';


function ChatContainer({ userChat, handleCloseChat }) {
    return (
        <div id="chatContainer">
            <div id="chatHeader">
                <h5>{userChat}</h5>
                <CloseButton onClick={handleCloseChat} />
            </div>

            <div id="chatMessages">
                {/* Aquí se mostrarán los mensajes */}
            </div>
            <div id="chatInput">
                <Button style={{ backgroundColor: "transparent", border: "none" }} >
                    <Icon path={mdiPaperclip} size={1} color='#000000' />
                </Button>

                <TextField id="outlined-basic" label="Escribe un mensaje" variant="outlined" style={{ width: '80%' }} />

                <Button style={{ backgroundColor: "transparent", border: "none" }} >
                    <Icon path={mdiSend} size={1} color='#000000' />
                </Button>

            </div>
        </div>
    );
}

export default ChatContainer;
