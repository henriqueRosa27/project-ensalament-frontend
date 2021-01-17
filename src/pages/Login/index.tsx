/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { withTypes } from 'react-final-form';
import { setIn } from 'final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { TextField } from 'mui-rff';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { loginRequest } from '../../store/ducks/session/actions';
import sessionData from '../../store/selector/session';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface FormValues {
  email?: string;
  password?: string;
}

const { Form } = withTypes<FormValues>();

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Campo obrigatório')
    .email('Informe um e-mail válido'),
  password: Yup.string()
    .required('Campo obrigatório')
    .min(8, 'Minímo de 8 caracteres')
    .max(16, 'Máximo de 16 caracteres'),
});

const validate = async (
  values: FormValues,
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

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector(sessionData);
  const classes = useStyles();
  const onSubmit = (auth: FormValues) => {
    dispatch(loginRequest({ email: auth.email!, password: auth.password! }));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        component={Paper}
        elevation={6}
        square
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={values => validate(values, schema)}
            render={({ handleSubmit }) => (
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  placeholder="Insira seu e-mail"
                  name="email"
                  autoComplete="email"
                  disabled={session.loading}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  placeholder="Insira sua senha"
                  type="password"
                  id="password"
                  disabled={session.loading}
                  autoComplete="current-password"
                />

                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  color="primary"
                  disabled={session.loading}
                  style={{ marginTop: 10 }}
                  fullWidth>
                  {session.loading ? (
                    <CircularProgress size={25} thickness={10} />
                  ) : (
                    <>Login</>
                  )}
                </Button>
              </form>
            )}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
