import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useXmppContext } from '../../paginas/context/XmppContext'; // Asegúrate de importar correctamente tu contexto
import { xml } from '@xmpp/client';


function DeleteAccountDialog({ open, handleClose }) {
    const { xmppClient } = useXmppContext();
    const [password, setPassword] = useState('');
    const storedPassword = localStorage.getItem('password');
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        if (password !== storedPassword) {
            alert("La contraseña es incorrecta. Inténtalo de nuevo.");
            return;
        }

        try {
            const iqStanza = xml(
                'iq',
                { type: 'set', id: 'deleteAccount1' },
                xml('query', { xmlns: 'jabber:iq:register' },
                    xml('remove')
                )
            );

            await xmppClient.send(iqStanza);

            xmppClient.on('stanza', (stanza) => {
                if (stanza.is('iq') && stanza.attrs.id === 'deleteAccount1' && stanza.attrs.type === 'result') {
                    alert("Cuenta eliminada con éxito.");
                    localStorage.clear(); // Limpiar el localStorage
                    // Aquí podrías redirigir al usuario a la pantalla de login o cerrar la sesión
                    handleClose();
                    navigate('/', { replace: true });
                }
            });
        } catch (error) {
            console.error('Error al eliminar la cuenta:', error);
            alert("Hubo un error al intentar eliminar la cuenta. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div id='DeleteAccountDialog'>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
            >
                <DialogTitle>Eliminar cuenta</DialogTitle>
                <DialogContent>
                    <p>¿Estás seguro de que deseas eliminar tu cuenta?</p>
                    <DialogContentText>
                        Introduce tu contraseña para confirmar la eliminación de tu cuenta.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleDeleteAccount}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteAccountDialog;
