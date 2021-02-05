import React from 'react';
import { Typography } from '@material-ui/core';
import { useDrop, DragObjectWithType } from 'react-dnd';

import TeamComponent from './Team';
import { useGenerateEnsalamentShift } from '../../../../../hooks/Ensalament/GenerateEnsalamentContext';

interface DragItem extends DragObjectWithType {
  roomId: string | null;
  id: string;
}

export default function Team() {
  const { data, moveTeamToNotEnsalated } = useGenerateEnsalamentShift();

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'TEAM',
    drop: (item: DragItem) => {
      if (!item.roomId) return;
      moveTeamToNotEnsalated(item.id);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={dropRef}
      style={{
        backgroundColor: canDrop && isOver ? '#8ea1f5' : '#bfc8d6',
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
            teamId={team.id!}
            key={team.id}
            onRoom={false}
            name={team.name}
            course={team.course.name}
            numberStudents={team.numberStudents}
            variant="h6"
            roomId={null}
          />
        ))}
      </div>
    </div>
  );
}
