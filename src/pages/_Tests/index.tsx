import React from 'react';
import Button from '@material-ui/core/Button';

import { useNotification } from '../../hooks/Notification';

export default function DisableElevation() {
  const { success } = useNotification();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        success('Mensagem de test');
      }}>
      Test
    </Button>
  );
}
