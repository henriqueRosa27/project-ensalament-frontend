import { Typography } from '@material-ui/core';
import React from 'react';

interface TeamProps {
  name: string;
  course: string;
  numberStudents: number;
  variant: any;
  onRoom: boolean;
}

export default function Team({
  name,
  course,
  numberStudents,
  variant,
  onRoom,
}: TeamProps) {
  return (
    <div
      style={{
        backgroundColor: onRoom ? '#f0f1f2' : '#e1e8f2',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderColor: '#000',
      }}>
      <Typography variant={variant}>
        {name}/{course} - {numberStudents}
      </Typography>
    </div>
  );
}
