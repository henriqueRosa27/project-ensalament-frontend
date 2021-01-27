import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { TextField, Checkboxes, Autocomplete } from 'mui-rff';
import { withTypes } from 'react-final-form';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import { FormComponent } from '../../../components';
import { getTeamById, createTeam, updateTeam } from '../../../services/team';
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

  const onSubmit = async (data: TeamFormvalues) => {
    setSubmitting(true);
    try {
      if (id) {
        await updateTeam(
          id,
          data.name || '',
          data.course!,
          data.numberStudents!,
          data.prefLab || false
        );
      } else {
        console.log(data.name, data.course, data.numberStudents, data.prefLab);
        await createTeam(
          data.name || '',
          data.numberStudents!,
          data.course!,
          data.prefLab || false
        );
      }
      history.push('/turma');
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
        const responseCourse = await getCoursesActive();
        setCourses(responseCourse);
        console.log(id);
        if (id) {
          const responseData = await getTeamById(id);
          console.log(responseData);
          setDataForm({
            name: responseData.name,
            prefLab: responseData.prefLab,
            numberStudents: responseData.numberStudents,
            course: responseData.course.id,
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
          style={{ marginBottom: 16, marginTop: 20 }}
        />
      ) : (
        <Autocomplete
          label="Prédio"
          name="course"
          fullWidth
          required
          noOptionsText="Sem registros"
          placeholder="Prédio a qual a sala pertence"
          options={courses}
          value={courses.find(course => course.id === dataForm.course)}
          getOptionValue={option => option.id}
          getOptionLabel={option => option.name}
          style={{
            marginBottom: 20,
          }}
        />
      )}
      {loading ? (
        <Skeleton
          variant="text"
          width={550}
          height={55}
          style={{ marginBottom: 16, marginTop: 20 }}
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
          style={{ marginBottom: 14, marginTop: 14 }}
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
