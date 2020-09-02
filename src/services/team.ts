import { autenticanted as axiosAutenticanted } from './api';
import TeamModel from '../models/Team';

const getTeams = async (): Promise<TeamModel[]> => {
  const response = await axiosAutenticanted.get('team');
  return response.data;
};

const getTeamById = async (id: number): Promise<TeamModel> => {
  const response = await axiosAutenticanted.get(`team/${id}`);
  return response.data;
};

const createTeam = async (name: string): Promise<TeamModel> => {
  const response = await axiosAutenticanted.post('team', { name });
  return response.data;
};

const updateTeam = async (id: number, name: string): Promise<TeamModel> => {
  const response = await axiosAutenticanted.put(`team/${id}`, { name });
  return response.data;
};

const deleteTeam = async (id: number): Promise<TeamModel> => {
  const response = await axiosAutenticanted.delete(`team/${id}`);
  return response.data;
};

const reactiveTeam = async (id: number): Promise<TeamModel> => {
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
