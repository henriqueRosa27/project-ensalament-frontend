import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Container,
  StepLabel,
  StepButton,
  Step,
} from '@material-ui/core';

import Data from './components/Data';
import Ensalament from './components/Ensalament';
import ColorlibStepIcon from './helpers';
import OptionsWeekShift from './components/Options';
import { useGenerateEnsalamentShift } from '../../hooks/Ensalament/GenerateEnsalamentContext';

interface Data {
  week: number | undefined;
  shift: number | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      flexDirection: 'column',
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },

    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    content: {
      marginTop: theme.spacing(5),
      backgroundColor: '#fff',
      borderRadius: 20,
      border: 'solid rgba(63, 81, 181, 0.4 )',
    },
  })
);

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const { getData, data } = useGenerateEnsalamentShift();

  const generateEnsalament = () => {
    getData(() => {
      setActiveStep(1);
    });
  };

  return (
    <Container className={classes.root}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        style={{
          minWidth: 400,
          width: '50%',
          borderRadius: 20,
          border: 'solid rgba(63, 81, 181, 0.4 )',
        }}>
        <Step>
          <StepButton
            onClick={() => {
              setActiveStep(0);
            }}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>Dados</StepLabel>
          </StepButton>
        </Step>
        <Step>
          <StepButton
            onClick={() => {
              if (activeStep === 1 || !!data.data) {
                setActiveStep(1);
              }
            }}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              Ensalamento
            </StepLabel>
          </StepButton>
        </Step>
      </Stepper>
      <OptionsWeekShift
        activeStep={activeStep}
        onClickGenerate={generateEnsalament}
        onClickClear={() => {
          setActiveStep(0);
        }}
      />
      <div className={classes.content}>
        {activeStep === 0 ? <Data /> : <Ensalament />}
      </div>
    </Container>
  );
}
