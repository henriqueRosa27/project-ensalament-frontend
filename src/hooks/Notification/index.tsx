import React, { createContext, ReactNode, useContext } from 'react';
import { useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Typography from '@material-ui/core/Typography';

interface NotificationProps {
  children: ReactNode;
}

interface NotificationContextData {
  success: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData
);

export default function ({ children }: NotificationProps) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const success = (message: string) => {
    enqueueSnackbar(
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CheckCircleOutlineIcon style={{ fontSize: 50, marginRight: 30 }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Typography variant="h6" gutterBottom>
            {message}
          </Typography>
        </div>
      </div>,
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
  return (
    <NotificationContext.Provider value={{ success }}>
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
