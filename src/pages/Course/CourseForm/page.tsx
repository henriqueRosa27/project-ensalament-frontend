import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { TextField } from 'mui-rff';
import { withTypes } from 'react-final-form';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import { useCourseCreate } from '../../../hooks/Courses/CreateContext';
import { useCourseUpdate } from '../../../hooks/Courses/UpdateContext';
import { useCourseById } from '../../../hooks/Courses/GetByIdContext';
import { FormComponent } from '../../../components';
import history from '../../../routes/history';

interface CourseFormvalues {
  name?: string;
}

interface ParamProps {
  id: string;
}

const { Form } = withTypes<CourseFormvalues>();

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(2, 'Campo obrigatório')
    .max(50, 'Campo obrigatório'),
});

const BuildingForm: React.FC = () => {
  const { id } = useParams<ParamProps>();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dataForm, setDataForm] = useState<CourseFormvalues>({ name: '' });

  const { createData, loading: submittingCreate } = useCourseCreate();
  const { updateData, loading: submittingUpdate } = useCourseUpdate();
  const { loadData, data, loading: loadingById } = useCourseById();

  const onSubmit = async ({ name }: CourseFormvalues) => {
    if (id) {
      await updateData(id, name!);
    } else {
      await createData(name!);
    }
    history.push('/curso');
  };

  useEffect(() => {
    setLoading(loadingById);
  }, [loadingById]);

  useEffect(() => {
    setSubmitting(submittingCreate || submittingUpdate);
  }, [submittingCreate, submittingUpdate]);

  useEffect(() => {
    setDataForm({ name: data.name });
  }, [data]);

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, []);

  return (
    <FormComponent
      title={`${id ? 'Alterar' : 'Criar'} Curso`}
      textButtonSubmit={id ? 'Alterar' : 'Criar'}
      FormProp={Form}
      schema={schema}
      onSubmit={onSubmit}
      initialValues={{ ...dataForm }}
      loading={loading}
      submitting={submitting}>
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
