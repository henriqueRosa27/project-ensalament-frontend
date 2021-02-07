import Room from './Room';

export default interface Building {
  name: string;
  active: boolean;
  rooms: Room[];
  id?: string;
}
