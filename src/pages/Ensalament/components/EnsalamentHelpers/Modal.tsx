import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { ModalContent, ModalHeader } from './styles';

interface ModalProps {
  message: string;
  open: boolean;
  handleClose: () => void;
}

export default function ({ message, open, handleClose }: ModalProps) {
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <div
        style={{
          backgroundColor: '#f76565',
          height: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <HighlightOffIcon style={{ fontSize: 100, color: '#fff' }} />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <DialogTitle id="customized-dialog-title">Erro</DialogTitle>
        <DialogContent>
          <ModalContent>
            <Typography gutterBottom>{message}</Typography>
          </ModalContent>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            color="primary"
            variant="outlined">
            Ok
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
