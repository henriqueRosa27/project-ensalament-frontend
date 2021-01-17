import { autenticanted as axiosAutenticanted } from './api';
import BuildingModel from '../models/Building';

const getBuildings = async (): Promise<BuildingModel[]> => {
  const response = await axiosAutenticanted.get('building');
  return response.data;
};

const getBuildingsActive = async (): Promise<BuildingModel[]> => {
  const response = await axiosAutenticanted.get('building/active');
  return response.data;
};

const getBuildingById = async (id: string): Promise<BuildingModel> => {
  const response = await axiosAutenticanted.get(`building/${id}`);
  return response.data;
};

const createBuilding = async (name: string): Promise<BuildingModel> => {
  const response = await axiosAutenticanted.post('building', { name });
  return response.data;
};

const updateBuilding = async (
  id: string,
  name: string
): Promise<BuildingModel> => {
  const response = await axiosAutenticanted.put(`building/${id}`, { name });
  return response.data;
};

const deleteBuilding = async (id: string): Promise<BuildingModel> => {
  const response = await axiosAutenticanted.delete(`building/${id}`);
  return response.data;
};

const reactiveBuilding = async (id: string): Promise<BuildingModel> => {
  const response = await axiosAutenticanted.patch(`building/${id}`);
  return response.data;
};

export {
  getBuildings,
  getBuildingById,
  createBuilding,
  updateBuilding,
  deleteBuilding,
  reactiveBuilding,
  getBuildingsActive,
};
