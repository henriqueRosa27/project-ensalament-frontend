import React from 'react';
import {
  Container,
  makeStyles,
  Theme,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';
import { TextField } from 'mui-rff';
import { withTypes } from 'react-final-form';
import * as Yup from 'yup';
import { setIn } from 'final-form';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

interface BuildingFormvalues {
  name?: string;
}

const { Form } = withTypes<BuildingFormvalues>();

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(2, 'Campo obrigatório')
    .max(50, 'Campo obrigatório'),
});

const validate = async (
  values: BuildingFormvalues,
  schemaValidate: Yup.ObjectSchema
  // eslint-disable-next-line consistent-return
) => {
  try {
    await schemaValidate.validate(values, { abortEarly: false });
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return e.inner.reduce((errors: any, error: any) => {
      return setIn(errors, error.path, error.message);
    }, {});
  }
};

const BuildingForm: React.FC = () => {
  const classes = useStyles();

  const onSubmit = (data: BuildingFormvalues) => {
    console.log(data);
  };

  return (
    <Container className={classes.container}>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Criar Prédio
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={(values) => validate(values, schema)}
            render={({ handleSubmit }) => (
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  label="Nome"
                  name="name"
                  margin="normal"
                  variant="filled"
                  placeholder="Nome do Prédio"
                  fullWidth
                  required
                />
                <div className={classes.buttons}>
                  <Button variant="contained" color="primary" type="submit">
                    Criar
                  </Button>
                </div>
              </form>
            )}
          />
        </Paper>
      </div>
    </Container>
  );
};

export default BuildingForm;
