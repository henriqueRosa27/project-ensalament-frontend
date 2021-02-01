import React, { createContext, ReactNode, useContext } from 'react';
import { useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

interface NotificationProps {
  children: ReactNode;
}

interface NotificationContextData {
  success: (message: string) => void;
  error: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData
);

const content = (Icon: JSX.Element, message: string) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {Icon}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Typography variant="h6" gutterBottom>
          {message}
        </Typography>
      </div>
    </div>
  );
};

export default function ({ children }: NotificationProps) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const success = (message: string) => {
    enqueueSnackbar(
      content(
        <CheckCircleOutlineIcon style={{ fontSize: 50, marginRight: 30 }} />,
        message
      ),
      {
        variant: 'success',
        autoHideDuration: 5000,
        action: key => (
          <IconButton
            onClick={() => {
              closeSnackbar(key);
            }}>
            <HighlightOffIcon style={{ color: '#fff' }} />
          </IconButton>
        ),
      }
    );
  };

  const error = (message: string) => {
    enqueueSnackbar(
      content(
        <ErrorOutlineIcon style={{ fontSize: 50, marginRight: 30 }} />,
        message
      ),
      {
        variant: 'error',
        autoHideDuration: 5000,
        action: key => (
          <IconButton
            onClick={() => {
              closeSnackbar(key);
            }}>
            <HighlightOffIcon style={{ color: '#fff' }} />
          </IconButton>
        ),
      }
    );
  };

  return (
    <NotificationContext.Provider value={{ success, error }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification(): NotificationContextData {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}
