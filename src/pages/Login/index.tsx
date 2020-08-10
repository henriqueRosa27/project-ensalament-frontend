import React, { useState } from 'react';
import { withTypes } from 'react-final-form';
import { Button, CircularProgress } from '@material-ui/core';
import { TextField } from 'mui-rff';
import LockIcon from '@material-ui/icons/Lock';
import * as Yup from 'yup';

import { setIn } from 'final-form';
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
    .min(8, 'Campo obrigatório')
    .max(16, 'Campo obrigatório'),
});

const validate = async (
  values: FormValues,
  schema2: Yup.ObjectSchema
  // eslint-disable-next-line consistent-return
) => {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return e.inner.reduce((errors: any, error: any) => {
      return setIn(errors, error.path, error.message);
    }, {});
  }
};

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const onSubmit = (auth: FormValues) => {
    setLoading(true);
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
              <Hint>Hint: demo / demo</Hint>

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
