import Course from './Course';

export default interface Building {
  name: string;
  active: boolean;
  numberStudents: number;
  prefLab: boolean;
  id?: string;
  course: Course;
}
