import { autenticanted as axiosAutenticanted } from './api';
import CourseModel from '../models/Course';

const getCourses = async (): Promise<CourseModel[]> => {
  const response = await axiosAutenticanted.get('course');
  return response.data;
};

const getCourseById = async (id: number): Promise<CourseModel> => {
  const response = await axiosAutenticanted.get(`course/${id}`);
  return response.data;
};

const createCourse = async (name: string): Promise<CourseModel> => {
  const response = await axiosAutenticanted.post('course', { name });
  return response.data;
};

const updateCourse = async (id: number, name: string): Promise<CourseModel> => {
  const response = await axiosAutenticanted.put(`course/${id}`, { name });
  return response.data;
};

const deleteCourse = async (id: number): Promise<CourseModel> => {
  const response = await axiosAutenticanted.delete(`course/${id}`);
  return response.data;
};

const reactiveCourse = async (id: number): Promise<CourseModel> => {
  const response = await axiosAutenticanted.patch(`course/${id}`);
  return response.data;
};

export {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  reactiveCourse,
};
