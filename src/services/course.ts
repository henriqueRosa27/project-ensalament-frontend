import { api as axiosAutenticanted } from './api';
import CourseModel from '../Models/Course';

const getCourses = async (): Promise<CourseModel[]> => {
  const response = await axiosAutenticanted.get('course');
  return response.data;
};

const getCoursesActive = async (): Promise<CourseModel[]> => {
  const response = await axiosAutenticanted.get('course/active');
  return response.data;
};

const getCourseById = async (id: string): Promise<CourseModel> => {
  const response = await axiosAutenticanted.get(`course/${id}`);
  return response.data;
};

const createCourse = async (name: string): Promise<CourseModel> => {
  const response = await axiosAutenticanted.post('course', { name });
  return response.data;
};

const updateCourse = async (id: string, name: string): Promise<CourseModel> => {
  const response = await axiosAutenticanted.put(`course/${id}`, { name });
  return response.data;
};

const deleteCourse = async (id: string): Promise<CourseModel> => {
  const response = await axiosAutenticanted.delete(`course/${id}`);
  return response.data;
};

const reactiveCourse = async (id: string): Promise<CourseModel> => {
  const response = await axiosAutenticanted.patch(`course/${id}`);
  return response.data;
};

export {
  getCourses,
  getCoursesActive,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  reactiveCourse,
};
