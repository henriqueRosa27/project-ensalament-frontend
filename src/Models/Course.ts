import Team from './Team';

export default interface Course {
  name: string;
  active: boolean;
  teams: Team[];
  id?: string;
}
