import Building from './Building';

export default interface Room {
  name: string;
  active: boolean;
  id?: number;
  building: Building;
}
