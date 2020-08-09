import React, { useState } from 'react';
import { Field, withTypes } from 'react-final-form';
import { TextField } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

import {
  DivMain,
  Card,
  Avatar,
  AvatarIcon,
  Hint,
  FormDiv,
  InputDiv,
} from './styles';

interface FormValues {
  email?: string;
  password?: string;
}

const { Form } = withTypes<FormValues>();

const renderInput = ({
  meta: { touched, error } = { touched: false, error: undefined },
  input: { ...inputProps },
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

const validate = (values: FormValues) => {
  const errors: FormValues = {};
  if (!values.email) {
    errors.email = 'teste';
  }
  if (!values.password) {
    errors.password = 'teste';
  }
  return errors;
};

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const submit = (auth: FormValues) => {
    setLoading(true);
    console.log(auth);
  };

  return (
    <Form
      onSubmit={submit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form noValidate>
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
                  <Field
                    autoFocus
                    name="email"
                    // @ts-ignore
                    component={renderInput}
                    disabled={loading}
                    label="E-mail"
                  />
                </InputDiv>
                <InputDiv>
                  <Field
                    autoFocus
                    name="password"
                    // @ts-ignore
                    component={renderInput}
                    disabled={loading}
                    label="Senha"
                  />
                </InputDiv>
              </FormDiv>
            </Card>
          </DivMain>
        </form>
      )}
    />
  );
};

export default Login;
