import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDrop, DragObjectWithType } from 'react-dnd';

import { Room as RoomModel } from '../../../../models/GenerateEnsalament';
import TeamModel from '../../../../models/Team';
import TeamComponent from './Team';
import { useOptionWeekShift } from '../../../../hooks/GenerateEnsalamentContext';
import ModalComponent from './Modal';

interface RoomProps {
  room: RoomModel;
}

interface DragItem extends DragObjectWithType {
  roomId: string | null;
  id: string;
}

export default function Room({ room }: RoomProps) {
  const { moveTeamToRoom, data } = useOptionWeekShift();
  const [modalOpen, setModalOpen] = useState(false);

  const checkAndReturnTeam = (
    teamId: string,
    roomId: string | null
  ): TeamModel => {
    if (!roomId) {
      return data.notEnsalate.find(({ id }) => id === teamId)!;
    }
    return data.data
      .map(({ rooms }) => rooms)
      .flat()
      .map(({ teams }) => teams)
      .flat()
      .find(({ id }) => id === teamId)!;
  };

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'TEAM',
    drop: (item: DragItem) => {
      if (!!item.roomId && item.roomId === room.id) return;

      const dataRoom = data.data
        .map(({ rooms }) => rooms)
        .flat()
        .find(({ id }) => id === room.id)!;

      const team = checkAndReturnTeam(item.id, item.roomId);

      if (
        dataRoom.teams.length === 0 &&
        dataRoom.capacity < team.numberStudents
      ) {
        setModalOpen(true);
        return;
      }

      let totalStudents = dataRoom.teams.reduce(
        (accum, value) => accum + value.numberStudents,
        0
      );
      totalStudents += team.numberStudents;
      if (dataRoom.capacity < totalStudents) {
        setModalOpen(true);
        return;
      }
      moveTeamToRoom(item.id, room.id!);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <>
      <div
        ref={dropRef}
        style={{
          backgroundColor: canDrop && isOver ? '#8ea1f5' : '#e1e8f2',
          margin: 10,
          padding: 10,
          borderRadius: 10,
          minWidth: 300,
        }}>
        <Typography variant="h6">
          {room.name} - {room.capacity}
        </Typography>
        {!!room.teams &&
          room.teams.length > 0 &&
          room.teams.map(team => (
            <TeamComponent
              teamId={team.id!}
              onRoom
              name={team.name}
              course={team.course.name}
              numberStudents={team.numberStudents}
              variant="h5"
              roomId={room.id!}
            />
          ))}
      </div>
      <ModalComponent
        message="Capacidade da sala excedida"
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
}
