import React from 'react';
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

function SettingsDialog({ open, handleClose }) {
    const [estado, setEstado] = React.useState('');
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
    
    const user = localStorage.getItem('user');

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
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Establece tu estado</Form.Label>
                            <Form.Control type="email" placeholder="Ingresa tu estado" value={estado} />
                        </Form.Group>
                    </Form>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                            Disponible
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Disponible</Dropdown.Item>
                            <Dropdown.Item>Ausente</Dropdown.Item>
                            <Dropdown.Item>No disponible</Dropdown.Item>
                            <Dropdown.Item>Ocupado</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Listo
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SettingsDialog;
