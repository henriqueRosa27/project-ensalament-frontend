import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { TextField, Checkboxes, Autocomplete } from 'mui-rff';
import { withTypes } from 'react-final-form';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import { useTeamCreate } from '../../../hooks/Teams/CreateContext';
import { useTeamUpdate } from '../../../hooks/Teams/UpdateContext';
import { useTeamById } from '../../../hooks/Teams/GetByIdContext';
import { useNotification } from '../../../hooks/Notification';
import { FormComponent } from '../../../components';
import history from '../../../routes/history';
import Course from '../../../models/Course';
import { getCoursesActive } from '../../../services/course';

interface TeamFormvalues {
  name?: string;
  prefLab?: boolean;
  numberStudents?: number;
  course?: string;
}

interface ParamTypes {
  id: string;
}

const { Form } = withTypes<TeamFormvalues>();

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(2, 'Campo obrigatório')
    .max(50, 'Campo obrigatório'),
  numberStudents: Yup.number()
    .required('Campo obrigatório')
    .min(0, 'Valor mínimo é 0'),
  course: Yup.string().required('Campo obrigatório'),
});

const BuildingForm: React.FC = () => {
  const { id } = useParams<ParamTypes>();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [dataForm, setDataForm] = useState<TeamFormvalues>({
    name: '',
    numberStudents: undefined,
    course: undefined,
    prefLab: false,
  });

  const { createData, loading: submittingCreate } = useTeamCreate();
  const { updateData, loading: submittingUpdate } = useTeamUpdate();
  const { loadData, data, loading: loadingById } = useTeamById();
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
      numberStudents: data.numberStudents,
      course: data?.course?.id,
      prefLab: data.prefLab,
    });
  }, [data]);

  const onSubmit = async ({
    name,
    course,
    numberStudents,
    prefLab,
  }: TeamFormvalues) => {
    if (id) {
      await updateData(id, name!, course!, numberStudents!, prefLab || false);
    } else {
      await createData(name!, numberStudents!, course!, prefLab || false);
    }
    history.push('/turma');
  };

  const onErrorLoadData = () => {
    error({ title: 'Erro ao buscar dado', message: 'Turma não existe' });
    history.push('/turma');
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const responseCourse = await getCoursesActive();
        setCourses(responseCourse);
        if (id) {
          await loadData(id, onErrorLoadData);
        }
      } catch (e) {
        error({
          title: 'Erro ao buscar dados',
          message: 'Erro algo buscar Turmas',
        });
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  return (
    <FormComponent
      title={`${id ? 'Alterar' : 'Criar'} Turma`}
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
          style={{ marginBottom: 16, marginTop: 20 }}
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
          label="Número de alunos"
          name="numberStudents"
          margin="normal"
          placeholder="Número de alunos"
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
          label="Curso"
          name="course"
          fullWidth
          required
          noOptionsText="Sem registros"
          placeholder="Prédio a qual a sala pertence"
          options={courses}
          value={courses.find(course => course.id === dataForm.course)}
          getOptionValue={option => option.id}
          getOptionLabel={option => option.name}
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
        <Checkboxes
          color="primary"
          name="prefLab"
          required
          data={{ label: 'Preferência por laboratório', value: false }}
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
