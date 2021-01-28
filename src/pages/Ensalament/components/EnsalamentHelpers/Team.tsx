import React from 'react';
import { Typography } from '@material-ui/core';
import { useDrag } from 'react-dnd';

import { DivTeam } from './styles';

interface TeamProps {
  teamId: string;
  name: string;
  course: string;
  numberStudents: number;
  variant: any;
  onRoom: boolean;
  roomId: string | null;
}

export default function Team({
  teamId: id,
  name,
  course,
  numberStudents,
  variant,
  onRoom,
  roomId,
}: TeamProps) {
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'TEAM', roomId, id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <DivTeam
      onRomm={onRoom}
      isDragging={isDragging}
      ref={dragRef}
      style={{
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderColor: '#000',
      }}>
      <Typography variant={variant}>
        {name}/{course} - {numberStudents}
      </Typography>
    </DivTeam>
  );
}
