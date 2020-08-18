/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { withTypes } from 'react-final-form';
import { setIn } from 'final-form';
import { useDispatch } from 'react-redux';
import { Button, CircularProgress } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { TextField } from 'mui-rff';
import * as Yup from 'yup';

import { loginRequest } from '../../store/ducks/session/actions';

import {
  DivMain,
  Card,
  Avatar,
  AvatarIcon,
  Hint,
  FormDiv,
  InputDiv,
  CardActions,
} from './styles';

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
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = (auth: FormValues) => {
    setLoading(true);
    dispatch(loginRequest({ email: auth.email!, password: auth.password! }));
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => validate(values, schema)}
      render={({ handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <DivMain>
            <Card>
              <Avatar>
                <AvatarIcon>
                  <LockIcon />
                </AvatarIcon>
              </Avatar>
              <Hint>Ensalamento/Demo</Hint>

              <FormDiv>
                <InputDiv>
                  <TextField
                    label="E-mail"
                    name="email"
                    margin="none"
                    disabled={loading}
                    required
                  />
                </InputDiv>
                <InputDiv>
                  <TextField
                    label="Senha"
                    name="password"
                    margin="none"
                    disabled={loading}
                    required
                  />
                </InputDiv>
              </FormDiv>
              <CardActions>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                  fullWidth
                >
                  {loading && (
                    <CircularProgress
                      size={25}
                      thickness={2}
                      color="secondary"
                    />
                  )}
                  Login
                </Button>
              </CardActions>
            </Card>
          </DivMain>
        </form>
      )}
    />
  );
};

export default Login;
