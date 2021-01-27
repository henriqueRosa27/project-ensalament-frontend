import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { StepIconProps } from '@material-ui/core/StepIcon';
import InfoIcon from '@material-ui/icons/Info';

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

export default function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, icon } = props;

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
