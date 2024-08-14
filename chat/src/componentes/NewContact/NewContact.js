import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert'; // Importa el componente Alert de Material UI
import { xml } from '@xmpp/client';

export default function FormDialog({ open, handleClose, xmppClient }) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(''); // Estado para almacenar el mensaje de error

    const addContact = async (username) => {
        try {
            const addContactIQ = xml(
                'iq',
                { type: 'set', id: 'addContact1' },
                xml('query', { xmlns: 'jabber:iq:roster' },
                    xml('item', { jid: `${username}@alumchat.lol`, name: username })
                )
            );

            await xmppClient.send(addContactIQ);

            const subscribePresence = xml(
                'presence',
                { type: 'subscribe', to: `${username}@alumchat.lol` }
            );

            await xmppClient.send(subscribePresence);

            console.log('🟢 Contacto agregado:', username);
            setError(''); // Limpia cualquier error previo
            handleClose(); // Cierra el diálogo después de agregar el contacto
        } catch (err) {
            console.error('❌ Error al agregar contacto:', err.toString());
            setError(`No se encontró ningún contacto con el nombre de usuario: ${username}`); // Establece el mensaje de error
        }
    }

    const handleAddContact = async (event) => {
        event.preventDefault();
        if (username) {
            await addContact(username);
        }
    }

    return (
        <div id='NCDialog'>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Añadir contacto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Introduce el nombre de usuario del contacto que deseas añadir.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="usernameContact"
                        label="Nombre de usuario"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>} {/* Muestra el mensaje de error si existe */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleAddContact}>Añadir</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
