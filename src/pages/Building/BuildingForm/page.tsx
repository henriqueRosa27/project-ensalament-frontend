import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { TextField } from 'mui-rff';
import { withTypes } from 'react-final-form';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import { useBuildingCreate } from '../../../hooks/Buildings/CreateContext';
import { useBuildingUpdate } from '../../../hooks/Buildings/UpdateContext';
import { useBuildingById } from '../../../hooks/Buildings/GetByIdContext';
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

interface ParamProps {
  id: string | undefined;
}

const BuildingForm: React.FC = () => {
  const { id } = useParams<ParamProps>();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dataForm, setDataForm] = useState<BuildingFormvalues>({ name: '' });

  const { createData, loading: submittingCreate } = useBuildingCreate();
  const { updateData, loading: submittingUpdate } = useBuildingUpdate();
  const { loadData, data, loading: loadingById } = useBuildingById();

  const onSubmit = async ({ name }: BuildingFormvalues) => {
    if (id) {
      await updateData(id, name!);
    } else {
      await createData(name!);
    }
    history.push('/predio');
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
