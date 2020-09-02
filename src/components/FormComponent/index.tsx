import React from 'react';
import {
  Container,
  makeStyles,
  Theme,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';
import { FormProps } from 'react-final-form';
import { ObjectSchema } from 'yup';
import { setIn } from 'final-form';

import history from '../../routes/history';

interface FormComponentProps {
  title: string;
  textButtonSubmit: string;
  children: any;
  FormProp: React.FC<FormProps>;
  schema: ObjectSchema;
  onSubmit: (data: any) => Promise<void>;
  initialValues: any;
  loading: boolean;
  submitting: boolean;
}

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
    justifyContent: 'space-between',
  },
}));

const validate = async (
  values: any,
  schemaValidate: ObjectSchema
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

const Form: React.FC<FormComponentProps> = ({
  title,
  textButtonSubmit,
  children,
  FormProp,
  schema,
  onSubmit,
  initialValues,
  loading,
  submitting,
}: FormComponentProps) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            {title}
          </Typography>

          <FormProp
            onSubmit={onSubmit}
            validate={(values) => validate(values, schema)}
            initialValues={initialValues}
            render={({ handleSubmit }) => (
              <form noValidate onSubmit={handleSubmit}>
                {children}
                <div className={classes.buttons}>
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={submitting || loading}
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    Voltar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting || loading}
                  >
                    {textButtonSubmit}
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

export default Form;
