import axios from 'axios';
import queryString from 'query-string';
import { EmployeeInterface, EmployeeGetQueryInterface } from 'interfaces/employee';
import { GetQueryInterface } from '../../interfaces';

export const getEmployees = async (query?: EmployeeGetQueryInterface) => {
  const response = await axios.get(`/api/employees${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEmployee = async (employee: EmployeeInterface) => {
  const response = await axios.post('/api/employees', employee);
  return response.data;
};

export const updateEmployeeById = async (id: string, employee: EmployeeInterface) => {
  const response = await axios.put(`/api/employees/${id}`, employee);
  return response.data;
};

export const getEmployeeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/employees/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEmployeeById = async (id: string) => {
  const response = await axios.delete(`/api/employees/${id}`);
  return response.data;
};
