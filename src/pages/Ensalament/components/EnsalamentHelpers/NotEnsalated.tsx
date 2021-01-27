import { Typography } from '@material-ui/core';
import React from 'react';

import TeamComponent from './Team';
import { useOptionWeekShift } from '../../../../hooks/GenerateEnsalamentContext';

export default function Team() {
  const { data } = useOptionWeekShift();
  return (
    <div
      style={{
        backgroundColor: '#bfc8d6',
        margin: 15,
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Typography variant="h4">Não Ensalado</Typography>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {data.notEnsalate.map(team => (
          <TeamComponent
            key={team.id}
            onRoom={false}
            name={team.name}
            course={team.course.name}
            numberStudents={team.numberStudents}
            variant="h6"
          />
        ))}
      </div>
    </div>
  );
}
