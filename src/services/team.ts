import { api as axiosAutenticanted } from './api';
import TeamModel from '../models/Team';

const getTeams = async (): Promise<any[]> => {
  const response = await axiosAutenticanted.get('team');
  return response.data;
};

const getTeamById = async (id: string): Promise<TeamModel> => {
  const response = await axiosAutenticanted.get(`team/${id}`);
  return response.data;
};

const createTeam = async (
  name: string,
  numberStudents: number,
  course: string,
  prefLab: boolean
): Promise<TeamModel> => {
  const response = await axiosAutenticanted.post('team', {
    name,
    number_students: numberStudents,
    prefLab,
    course_id: course,
  });
  return response.data;
};

const updateTeam = async (
  id: string,
  name: string,
  course: string,
  numberStudents: number,
  prefLab: boolean
): Promise<TeamModel> => {
  const response = await axiosAutenticanted.put(`team/${id}`, {
    name,
    number_students: numberStudents,
    prefLab,
    course_id: course,
  });
  return response.data;
};

const deleteTeam = async (id: string): Promise<TeamModel> => {
  const response = await axiosAutenticanted.delete(`team/${id}`);
  return response.data;
};

const reactiveTeam = async (id: string): Promise<TeamModel> => {
  const response = await axiosAutenticanted.patch(`team/${id}`);
  return response.data;
};

export {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  reactiveTeam,
};
