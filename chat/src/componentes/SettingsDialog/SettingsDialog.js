import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { xml } from '@xmpp/client';

function SettingsDialog({ open, handleClose, xmppClient }) {
    const [estado, setEstado] = useState('');
    const [disponibilidad, setDisponibilidad] = useState('available');
    const [conectado, setConectado] = useState(false);
    const [mensajeConexion, setMensajeConexion] = useState('');
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
    
    const user = localStorage.getItem('user');

    const handleDisponibilidadChange = (e) => {
        const selectedValue = e.target.textContent.toLowerCase();
        let xmppValue = 'chat';
    
        switch (selectedValue) {
            case 'disponible':
                xmppValue = 'chat';
                break;
            case 'ausente':
                xmppValue = 'away';
                break;
            case 'no disponible':
                xmppValue = 'xa';
                break;
            case 'ocupado':
                xmppValue = 'dnd';
                break;
            default:
                xmppValue = 'chat';
        }
    
        setDisponibilidad(xmppValue);
    };

    
    useEffect(() => {
        if (xmppClient) {
            const handleOnline = () => {
                setConectado(true);
                setMensajeConexion('🟢 Conectado al servidor');
            };

            const handleOffline = () => {
                setConectado(false);
                setMensajeConexion('🔴 Desconectado del servidor');
            };

            const handleError = (err) => {
                console.error('❌ Error:', err);
                setMensajeConexion(`❌ Error: ${err.message}`);
            };

            xmppClient.on('online', handleOnline);
            xmppClient.on('offline', handleOffline);
            xmppClient.on('error', handleError);

            return () => {
                xmppClient.off('online', handleOnline);
                xmppClient.off('offline', handleOffline);
                xmppClient.off('error', handleError);
            };
        }
    }, [xmppClient]);

    const handleSetEstado = async () => {
        if (xmppClient && conectado) {
            try {
                const presence = xml(
                    'presence',
                    {},
                    xml('show', {}, disponibilidad),
                    xml('status', {}, estado)
                );
                await xmppClient.send(presence);
                console.log(`Estado actualizado a ${disponibilidad} con mensaje: ${estado}`);
                setMensajeConexion(`Estado actualizado a ${disponibilidad} con mensaje: ${estado}`);
                handleClose();
            } catch (err) {
                console.error('❌ Error al enviar la presencia:', err);
                setMensajeConexion(`❌ Error al enviar la presencia: ${err.message}`);
            }
        } else {
            setMensajeConexion('No se pudo enviar la presencia. No estás conectado al servidor.');
        }
    };

    

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={fullscreen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Ajustes de cuenta"}
            </DialogTitle>
            <DialogContent>
                <div id="SettingsDialogView">
                    <Icon path={mdiAccount} size={2} color='#000000' />
                    <DialogContentText id="alert-dialog-description">
                        {user}
                    </DialogContentText>
                    <br />
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Establece tu estado</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ingresa tu estado" 
                                value={estado} 
                                onChange={(e) => setEstado(e.target.value)} 
                            />
                        </Form.Group>
                    </Form>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                            {disponibilidad.charAt(0).toUpperCase() + disponibilidad.slice(1)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleDisponibilidadChange}>Disponible</Dropdown.Item>
                            <Dropdown.Item onClick={handleDisponibilidadChange}>Ausente</Dropdown.Item>
                            <Dropdown.Item onClick={handleDisponibilidadChange}>No disponible</Dropdown.Item>
                            <Dropdown.Item onClick={handleDisponibilidadChange}>Ocupado</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <br />
                    {mensajeConexion && (
                        <DialogContentText id="alert-dialog-description" style={{ marginTop: '1em', color: conectado ? 'green' : 'red' }}>
                            {mensajeConexion}
                        </DialogContentText>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSetEstado} autoFocus>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SettingsDialog;
