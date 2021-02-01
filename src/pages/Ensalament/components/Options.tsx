import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { shiftOptions, weekOptions } from '../../../models/WeekShift';
import { useOptionWeekShift } from '../../../hooks/Ensalament/OptionsWeekShiftContext';
import { useBuildingDataSelects } from '../../../hooks/Ensalament/Datas/DataBuildingSelectsContext';
import { useCourseDataSelects } from '../../../hooks/Ensalament/Datas/DataCourseSelectsContext';
import { useCreateEnsalament } from '../../../hooks/Ensalament/CreateEnsalamentContext';

interface OptionsWeekShiftProps {
  onClickGenerate: () => void;
  onClickClear: () => void;
  activeStep: number;
}

export default function OptionsWeekShift({
  onClickGenerate,
  onClickClear,
  activeStep,
}: OptionsWeekShiftProps) {
  const {
    data,
    changeData,
    statusOption,
    getDatas,
    status,
  } = useOptionWeekShift();
  const {
    childrenSelecteds: roomsIds,
    clearChildren: clearChildrenRooms,
  } = useBuildingDataSelects();
  const {
    childrenSelecteds: teamsIds,
    clearChildren: clearChildrenTeams,
  } = useCourseDataSelects();
  const { save } = useCreateEnsalament();

  const renderOptions = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 20,
          minWidth: 200,
          width: '50%',
          borderRadius: 20,
          padding: 10,
          border: 'solid rgba(63, 81, 181, 0.4 )',
        }}>
        <Autocomplete
          options={weekOptions}
          getOptionLabel={option => option.title}
          onInputChange={(_, value) => {
            const newValue = weekOptions.find(o => o.title === value)?.value;
            changeData({ ...data, week: newValue });
          }}
          style={{ width: 200, padding: 5 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Dia da semana"
              placeholder="Selecione o dia da semana"
              variant="outlined"
            />
          )}
        />
        <Autocomplete
          options={shiftOptions}
          getOptionLabel={option => option.title}
          onInputChange={(_, value) => {
            const newValue = shiftOptions.find(o => o.title === value)?.value;
            changeData({ ...data, shift: newValue });
          }}
          style={{ width: 200, padding: 5 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Turno do dia"
              placeholder="Selecione o turno do dia"
              variant="outlined"
            />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ padding: 5, margin: 5, width: 200, height: 55 }}
          disabled={statusOption()}
          onClick={getDatas}>
          Buscar
        </Button>
      </div>
    );
  };

  const renderSelected = () => {
    const renderText = (): string => {
      const week = weekOptions.find(w => w.value === data.week)?.title;
      const shift = shiftOptions.find(s => s.value === data.shift)?.title;

      return `${week} - ${shift}`;
    };

    const buttonIsDisabled = () => {
      if (roomsIds.length === 0) return true;
      if (teamsIds.length === 0) return true;

      return false;
    };

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: 20,
          minWidth: 200,
          width: '50%',
          borderRadius: 20,
          padding: 10,
          border: 'solid rgba(63, 81, 181, 0.4 )',
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: 5,
            padding: 5,
          }}>
          <Typography variant="h6" gutterBottom align="center">
            {renderText()}
          </Typography>
        </div>
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          style={{
            padding: 5,
            margin: 5,
            width: 180,
            height: 55,
          }}
          onClick={() => {
            clearChildrenRooms();
            clearChildrenTeams();
            changeData({} as any);
            onClickClear();
          }}>
          Limpar
        </Button>
        {activeStep === 0 ? (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            style={{
              padding: 5,
              margin: 5,
              width: 180,
              height: 55,
            }}
            disabled={buttonIsDisabled()}
            onClick={onClickGenerate}>
            Gerar
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            style={{
              padding: 5,
              margin: 5,
              width: 180,
              height: 55,
            }}
            disabled={buttonIsDisabled()}
            onClick={save}>
            Salvar
          </Button>
        )}
      </div>
    );
  };
  if (status !== 'doneRequest') return renderOptions();
  return renderSelected();
}
