import React from 'react';
import Button from '@material-ui/core/Button';

import { useNotification } from '../../hooks/Notification';

export default function DisableElevation() {
  const { error } = useNotification();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        error('Mensagem de test');
      }}>
      Test
    </Button>
  );
}
