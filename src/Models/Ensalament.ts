import Team from './Team';
import RoomDefault from './Room';
import CourseDefault from './Course';

export default interface Ensalament {
  data: Building[];
  notEnsalate: Team[];
}

interface Building {
  name: string;
  active: boolean;
  rooms: Room[];
  id?: string;
}

export interface Room extends RoomDefault {
  team: Team;
}

export interface EnsalementResponse {
  id: string;
  week: number;
  shift: number;
  rooms: number;
  teams: number;
}

export interface EnsalamentById {
  id: string;
  week: number;
  shift: number;
  buildings: BuildingEnsalamentById[];
}

interface BuildingEnsalamentById {
  name: string;
  active: boolean;
  rooms: RoomEnsalamentById[];
  id?: string;
}
interface RoomEnsalamentById {
  name: string;
  capacity: number;
  isLab: boolean;
  active: boolean;
  id?: string | undefined;
  teams: Team[];
}
export interface EnsalamentDetail extends CourseDefault {
  teams: TeamToDetail[];
}

interface TeamToDetail extends Team {
  room: RoomDefault;

  week: number;

  shift: number;
}
