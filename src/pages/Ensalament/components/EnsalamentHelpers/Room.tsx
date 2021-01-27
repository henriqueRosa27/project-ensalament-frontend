import { Typography } from '@material-ui/core';
import React from 'react';

import { Room as RoomModel } from '../../../../models/Ensalament';
import TeamComponent from './Team';

interface RoomProps {
  room: RoomModel;
}

export default function Room({ room }: RoomProps) {
  return (
    <div
      style={{
        backgroundColor: '#e1e8f2',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        minWidth: 300,
      }}>
      <Typography variant="h6">
        {room.name} - {room.capacity}
      </Typography>
      {room.team && (
        <TeamComponent
          onRoom
          name={room.team.name}
          course={room.team.course.name}
          numberStudents={room.team.numberStudents}
          variant="h5"
        />
      )}
    </div>
  );
}
