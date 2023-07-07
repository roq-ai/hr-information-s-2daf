import axios from 'axios';
import queryString from 'query-string';
import { VacationInterface, VacationGetQueryInterface } from 'interfaces/vacation';
import { GetQueryInterface } from '../../interfaces';

export const getVacations = async (query?: VacationGetQueryInterface) => {
  const response = await axios.get(`/api/vacations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createVacation = async (vacation: VacationInterface) => {
  const response = await axios.post('/api/vacations', vacation);
  return response.data;
};

export const updateVacationById = async (id: string, vacation: VacationInterface) => {
  const response = await axios.put(`/api/vacations/${id}`, vacation);
  return response.data;
};

export const getVacationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/vacations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVacationById = async (id: string) => {
  const response = await axios.delete(`/api/vacations/${id}`);
  return response.data;
};
