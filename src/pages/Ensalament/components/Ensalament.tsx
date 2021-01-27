import React from 'react';
import { Container, Typography } from '@material-ui/core';

import { useOptionWeekShift } from '../../../hooks/GenerateEnsalamentContext';
import RoomComponent from './EnsalamentHelpers/Room';
import NotEnsalatedComponent from './EnsalamentHelpers/NotEnsalated';

export default function Ensalament() {
  const { data } = useOptionWeekShift();
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 600,
          maxWidth: 1380,
        }}>
        <div style={{ overflowY: 'auto', maxHeight: 400 }}>
          {data.data.map(building => (
            <div
              style={{
                backgroundColor: '#bfc8d6',
                margin: 15,
                borderRadius: 10,
                padding: 10,
                width: 'auto',
                overflowX: 'auto',
              }}>
              <Typography variant="h4">{building.name}</Typography>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                {building.rooms.map(room => (
                  <RoomComponent key={room.id} room={room} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <NotEnsalatedComponent />
      </div>
    </Container>
  );
}
