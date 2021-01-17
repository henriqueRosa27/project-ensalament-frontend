import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { TextField, Autocomplete, Checkboxes } from 'mui-rff';
import { withTypes } from 'react-final-form';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import { FormComponent } from '../../../components';
import { getRoomById, createRoom, updateRoom } from '../../../services/room';
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
  building: Yup.number().required('Campo obrigatório'),
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

  const onSubmit = async (data: RoomFormvalues) => {
    setSubmitting(true);
    try {
      console.log(data);
      if (id) {
        await updateRoom(
          id,
          data.name || '',
          data.capacity!,
          data.isLab || false,
          data.building!
        );
      } else {
        await createRoom(
          data.name || '',
          data.capacity!,
          data.isLab || false,
          data.building!
        );
      }
      history.push('/sala');
    } catch (e) {
      console.log(e.response);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const responseData = await getBuildingsActive();
        setDataBuilding(responseData);
        if (id) {
          const responseDataRoom = await getRoomById(id);
          setDataForm({
            name: responseDataRoom.name,
            building: responseDataRoom.building.id!,
            isLab: responseDataRoom.isLab,
            capacity: responseDataRoom.capacity,
          });
        }
      } catch (e) {
        console.log(e);
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
