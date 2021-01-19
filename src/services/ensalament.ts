import { api as axiosAutenticanted } from './api';
import CourseModel from '../models/Course';
import BuildingModel from '../models/Building';

const getCourses = async (): Promise<CourseModel[]> => {
  const response = await axiosAutenticanted.get('ensalament/courses');
  return response.data;
};

const getBuildings = async (): Promise<BuildingModel[]> => {
  const response = await axiosAutenticanted.get('ensalament/buildings');
  return response.data;
};

export { getCourses, getBuildings };
