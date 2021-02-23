import { api as axiosAutenticanted } from './api';
import CourseModel from '../Models/Course';
import BuildingModel from '../Models/Building';
import EnsalamentModel, {
  EnsalementResponse,
  EnsalamentById,
  EnsalamentDetail,
} from '../Models/Ensalament';

interface SaveEnsalament {
  week: number;

  shift: number;

  rooms: {
    id: string;

    teams: string[];
  }[];
}

const getCourses = async (
  week: number,
  shift: number
): Promise<CourseModel[]> => {
  const response = await axiosAutenticanted.get(
    `ensalament/courses/${week}/${shift}`
  );
  return response.data;
};

const getBuildings = async (
  week: number,
  shift: number
): Promise<BuildingModel[]> => {
  const response = await axiosAutenticanted.get(
    `ensalament/buildings/${week}/${shift}`
  );
  return response.data;
};

const generate = async (
  roomsIds: string[],
  teamsIds: string[]
): Promise<EnsalamentModel> => {
  const response = await axiosAutenticanted.post(`ensalament/generate/`, {
    roomsIds,
    teamsIds,
  });
  return response.data;
};

const save = async (data: SaveEnsalament): Promise<EnsalamentModel> => {
  const response = await axiosAutenticanted.post(`ensalament/`, data);
  return response.data;
};

const getEnsalaments = async (): Promise<EnsalementResponse[]> => {
  const response = await axiosAutenticanted.get(`ensalament`);
  return response.data;
};

const deleteEnsalament = async (id: string): Promise<void> => {
  await axiosAutenticanted.delete(`ensalament/${id}`);
};

const getEnsalamentByid = async (id: string): Promise<EnsalamentById> => {
  const response = await axiosAutenticanted.get(`ensalament/${id}`);
  return response.data;
};

const getEnsalamentDetails = async (): Promise<EnsalamentDetail> => {
  const response = await axiosAutenticanted.get(`ensalament/details`);
  return response.data;
};

export {
  getCourses,
  getBuildings,
  generate,
  save,
  getEnsalaments,
  deleteEnsalament,
  getEnsalamentByid,
  getEnsalamentDetails,
};
