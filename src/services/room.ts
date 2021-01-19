import { api as axiosAutenticanted } from './api';
import RoomModel from '../models/Room';

const getRooms = async (): Promise<RoomModel[]> => {
  const response = await axiosAutenticanted.get('room');
  return response.data;
};

const getRoomById = async (id: string): Promise<RoomModel> => {
  const response = await axiosAutenticanted.get(`room/${id}`);
  return response.data;
};

const createRoom = async (
  name: string,
  capacity: number,
  isLab: boolean,
  buildingId: string
): Promise<RoomModel> => {
  const response = await axiosAutenticanted.post('room', {
    name,
    capacity,
    is_lab: isLab,
    building_id: buildingId,
  });
  return response.data;
};

const updateRoom = async (
  id: string,
  name: string,
  capacity: number,
  isLab: boolean,
  buildingId: string
): Promise<RoomModel> => {
  const response = await axiosAutenticanted.put(`room/${id}`, {
    name,
    capacity,
    is_lab: isLab,
    building_id: buildingId,
  });
  return response.data;
};

const deleteRoom = async (id: string): Promise<RoomModel> => {
  const response = await axiosAutenticanted.delete(`room/${id}`);
  return response.data;
};

const reactiveRoom = async (id: string): Promise<RoomModel> => {
  const response = await axiosAutenticanted.patch(`room/${id}`);
  return response.data;
};

export {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  reactiveRoom,
};
