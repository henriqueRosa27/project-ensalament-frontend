import React, { createContext, ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';
import styles from './styles';

interface NotificationProps {
  children: ReactNode;
}

interface NotificationContextData {
  success: () => void;
}

const AuthContext = createContext<NotificationContextData>(
  {} as NotificationContextData
);

export default function ({ children }: NotificationProps) {
  const classes = styles();
  return (
    <SnackbarProvider
      classes={classes}
      hideIconVariant
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
      {children}
    </SnackbarProvider>
  );
}
