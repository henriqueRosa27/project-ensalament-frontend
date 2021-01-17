import Building from './Building';

export default interface Room {
  name: string;
  capacity: number;
  isLab: boolean;
  active: boolean;
  id?: string;
  building: Building;
}
