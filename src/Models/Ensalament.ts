import Team from './Team';
import RoomDefault from './Room';

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
