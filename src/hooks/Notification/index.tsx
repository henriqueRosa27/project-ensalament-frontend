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

interface ContentData {
  Icon: JSX.Element;
  title: string;
  message: string | string[];
}
interface ErrorData {
  message: string | string[];
  title?: string;
}

interface SuccessData {
  message: string;
  title?: string;
}

interface NotificationContextData {
  success: (data: SuccessData) => void;
  error: (data: ErrorData) => void;
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData
);

const contentMessage = (message: string) => {
  return (
    <Typography variant="subtitle1" gutterBottom>
      {message}
    </Typography>
  );
};

const content = ({ Icon, title, message }: ContentData) => {
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
          {title}
        </Typography>
        {Array.isArray(message)
          ? message.map(m => contentMessage(m))
          : contentMessage(message)}
      </div>
    </div>
  );
};

export default function ({ children }: NotificationProps) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const success = ({ message, title = 'Sucesso' }: SuccessData) => {
    enqueueSnackbar(
      content({
        Icon: (
          <CheckCircleOutlineIcon style={{ fontSize: 50, marginRight: 30 }} />
        ),
        message,
        title,
      }),
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

  const error = ({ message, title = 'Erro' }: ErrorData) => {
    enqueueSnackbar(
      content({
        Icon: <ErrorOutlineIcon style={{ fontSize: 50, marginRight: 30 }} />,
        title,
        message,
      }),
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
