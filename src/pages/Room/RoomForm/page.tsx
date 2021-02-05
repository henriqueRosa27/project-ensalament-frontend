import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { TextField, Autocomplete, Checkboxes } from 'mui-rff';
import { withTypes } from 'react-final-form';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import { useRoomCreate } from '../../../hooks/Rooms/CreateContext';
import { useRoomUpdate } from '../../../hooks/Rooms/UpdateContext';
import { useRoomById } from '../../../hooks/Rooms/GetByIdContext';
import { useNotification } from '../../../hooks/Notification';
import { FormComponent } from '../../../components';
import { getBuildingsActive } from '../../../services/building';
import history from '../../../routes/history';
import BuildingModel from '../../../models/Building';

interface RoomFormvalues {
  name?: string;
  capacity?: number;
  building?: string;
  isLab?: boolean;
}
interface ParamTypes {
  id: string;
}

const { Form } = withTypes<RoomFormvalues>();

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(2, 'Campo obrigatório')
    .max(50, 'Campo obrigatório'),
  capacity: Yup.number()
    .required('Campo obrigatório')
    .min(0, 'Valor mínimo é 0'),
  building: Yup.string().required('Campo obrigatório'),
});

const BuildingForm: React.FC = () => {
  const { id } = useParams<ParamTypes>();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dataBuilding, setDataBuilding] = useState<Array<BuildingModel>>([]);
  const [dataForm, setDataForm] = useState<RoomFormvalues>({
    name: '',
    capacity: undefined,
    building: undefined,
    isLab: false,
  });

  const { createData, loading: submittingCreate } = useRoomCreate();
  const { updateData, loading: submittingUpdate } = useRoomUpdate();
  const { loadData, data, loading: loadingById } = useRoomById();
  const { error } = useNotification();

  useEffect(() => {
    setLoading(loadingById);
  }, [loadingById]);

  useEffect(() => {
    setSubmitting(submittingCreate || submittingUpdate);
  }, [submittingCreate, submittingUpdate]);

  useEffect(() => {
    setDataForm({
      name: data.name,
      capacity: data.capacity,
      building: data?.building?.id,
      isLab: data.isLab,
    });
  }, [data]);

  const onSubmit = async ({
    name,
    capacity,
    isLab,
    building,
  }: RoomFormvalues) => {
    if (id) {
      await updateData(id, name!, capacity!, isLab || false, building!);
    } else {
      await createData(name!, capacity!, isLab || false, building!);
    }
    history.push('/sala');
  };

  const onErrorLoadData = () => {
    error({ title: 'Erro ao buscar dado', message: 'Prédio não existe' });
    history.push('/sala');
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const responseData = await getBuildingsActive();
        setDataBuilding(responseData);
        if (id) {
          loadData(id, onErrorLoadData);
        }
      } catch (e) {
        error({
          title: 'Erro ao buscar dados',
          message: 'Erro algo buscar Prédios',
        });
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  return (
    <FormComponent
      title={`${id ? 'Alterar' : 'Criar'} Sala`}
      textButtonSubmit={id ? 'Alterar' : 'Criar'}
      FormProp={Form}
      schema={schema}
      onSubmit={onSubmit}
      initialValues={{ ...dataForm }}
      loading={loading}
      submitting={submitting}>
      {loading ? (
        <Skeleton
          variant="text"
          width={550}
          height={55}
          style={{ marginBottom: 16, marginTop: 16 }}
        />
      ) : (
        <TextField
          label="Nome"
          name="name"
          margin="normal"
          placeholder="Nome da Sala"
          fullWidth
          required
        />
      )}

      {loading ? (
        <Skeleton
          variant="text"
          width={550}
          height={55}
          style={{ marginBottom: 16, marginTop: 16 }}
        />
      ) : (
        <TextField
          type="number"
          label="Capacidade máxima da sala"
          name="capacity"
          margin="normal"
          placeholder="Capacidade máxima da sala"
          fullWidth
          required
        />
      )}
      {loading ? (
        <Skeleton
          variant="rect"
          width={550}
          height={55}
          style={{ marginBottom: 16, marginTop: 16 }}
        />
      ) : (
        <Autocomplete
          label="Prédio"
          name="building"
          fullWidth
          required
          noOptionsText="Sem registros"
          placeholder="Prédio a qual a sala pertence"
          options={dataBuilding}
          value={dataBuilding.find(
            building => building.id === dataForm.building
          )}
          getOptionValue={option => option.id}
          getOptionLabel={option => option.name}
          style={{
            marginBottom: 20,
          }}
        />
      )}

      {loading ? (
        <Skeleton
          variant="rect"
          width={550}
          height={55}
          style={{ marginBottom: 14, marginTop: 14 }}
        />
      ) : (
        <Checkboxes
          color="primary"
          name="isLab"
          required
          data={{ label: 'É um laboratório', value: false }}
        />
      )}
      <div
        style={{
          marginBottom: 20,
        }}
      />
    </FormComponent>
  );
};

export default BuildingForm;
