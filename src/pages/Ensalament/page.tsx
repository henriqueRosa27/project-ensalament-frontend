import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Container,
  StepLabel,
  StepButton,
  Step,
} from '@material-ui/core';
import { StepIconProps } from '@material-ui/core/StepIcon';
import InfoIcon from '@material-ui/icons/Info';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import Data from './components/Data';
import { useBuildingDataSelects } from '../../hooks/DataBuildingSelectsContext';
import { useCourseDataSelects } from '../../hooks/DataCourseSelectsContext';

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

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(151, 158, 196) 0%, rgb(111, 123, 191) 50%, rgb(63, 81, 181) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(151, 158, 196) 0%, rgb(111, 123, 191) 50%, rgb(63, 81, 181) 100%)',
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, icon } = props;

  const { get: getCourse } = useCourseDataSelects();

  const { get: getBuilding } = useBuildingDataSelects();

  useEffect(() => {
    getCourse();
    getBuilding();
  }, []);

  const icons: { [index: string]: React.ReactElement } = {
    1: <InfoIcon />,
    2: <ViewModuleIcon />,
  };

  return (
    <div className={[classes.root, active ? classes.active : {}].join(' ')}>
      {icons[String(icon)]}
    </div>
  );
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Container className={classes.root}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        style={{
          minWidth: 400,
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
              setActiveStep(1);
            }}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              Ensalamento
            </StepLabel>
          </StepButton>
        </Step>
      </Stepper>

      <div className={classes.content}>
        {activeStep === 0 ? <Data /> : <h1>TESTE</h1>}
      </div>
    </Container>
  );
}
