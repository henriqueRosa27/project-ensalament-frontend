import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { TextField } from 'mui-rff';
import { withTypes } from 'react-final-form';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import { FormComponent } from '../../../components';
import {
  getCourseById,
  createCourse,
  updateCourse,
} from '../../../services/course';
import history from '../../../routes/history';

interface CourseFormvalues {
  name?: string;
}

const { Form } = withTypes<CourseFormvalues>();

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(2, 'Campo obrigatório')
    .max(50, 'Campo obrigatório'),
});

const BuildingForm: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dataForm, setDataForm] = useState<CourseFormvalues>({ name: '' });

  const onSubmit = async (data: CourseFormvalues) => {
    setSubmitting(true);
    try {
      if (id) {
        await updateCourse(id, data.name || '');
      } else {
        await createCourse(data.name || '');
      }
      history.push('/curso');
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getBuilding = async () => {
      try {
        setLoading(true);
        const responseData = await getCourseById(id);
        setDataForm(responseData);
      } catch (e) {
        console.log(e.response);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      getBuilding();
    }
  }, [id]);

  return (
    <FormComponent
      title={`${id ? 'Alterar' : 'Criar'} Curso`}
      textButtonSubmit={id ? 'Alterar' : 'Criar'}
      FormProp={Form}
      schema={schema}
      onSubmit={onSubmit}
      initialValues={{ ...dataForm }}
      loading={loading}
      submitting={submitting}
    >
      {loading ? (
        <Skeleton
          variant="rect"
          width={550}
          height={55}
          style={{ marginBottom: 16, marginTop: 16 }}
        />
      ) : (
        <TextField
          label="Nome"
          name="name"
          margin="normal"
          variant="filled"
          placeholder="Nome do Curso"
          fullWidth
          required
        />
      )}
    </FormComponent>
  );
};

export default BuildingForm;
