import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { TextField, Autocomplete } from 'mui-rff';
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
  building?: number;
}

const { Form } = withTypes<RoomFormvalues>();

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(2, 'Campo obrigatório')
    .max(50, 'Campo obrigatório'),
  building: Yup.number().required('Campo obrigatório'),
});

const BuildingForm: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dataForm, setDataForm] = useState<RoomFormvalues>({
    name: '',
    building: undefined,
  });
  const [dataBuilding, setDataBuilding] = useState<Array<BuildingModel>>([]);

  const onSubmit = async (data: RoomFormvalues) => {
    setSubmitting(true);
    try {
      if (id) {
        console.log(data);
        await updateRoom(id, data.name || '', data.building!);
      } else {
        await createRoom(data.name || '', data.building!);
      }
      history.push('/sala');
    } catch (e) {
      console.log(e);
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
          });
        }
      } catch (e) {
        console.log(e.response);
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
      submitting={submitting}
    >
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
          placeholder="Prédio a qual a sala pertence"
          options={dataBuilding}
          onChange={(event, value) => {
            console.log(value);
          }}
          value={dataBuilding.find(
            (building) => building.id === dataForm.building
          )}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.name}
        />
      )}
    </FormComponent>
  );
};

export default BuildingForm;
