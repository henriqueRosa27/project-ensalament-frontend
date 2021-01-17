import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { TextField } from 'mui-rff';
import { withTypes } from 'react-final-form';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import { FormComponent } from '../../../components';
import {
  getBuildingById,
  createBuilding,
  updateBuilding,
} from '../../../services/building';
import history from '../../../routes/history';

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

const BuildingForm: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dataForm, setDataForm] = useState<BuildingFormvalues>({ name: '' });

  const onSubmit = async (data: BuildingFormvalues) => {
    setSubmitting(true);
    try {
      if (id) {
        await updateBuilding(id, data.name || '');
      } else {
        await createBuilding(data.name || '');
      }
      history.push('/predio');
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
        const responseData = await getBuildingById(id);
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
      title={`${id ? 'Alterar' : 'Criar'} Prédio`}
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
          placeholder="Nome do Prédio"
          fullWidth
          required
        />
      )}
    </FormComponent>
  );
};

export default BuildingForm;
