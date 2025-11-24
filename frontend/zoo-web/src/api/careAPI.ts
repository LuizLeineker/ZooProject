import { api } from "./api";

export const getCare = () => {
  return api.get("/cuidados");
};

export const getCareById = (id: number) => {
  return api.get(`/cuidado/${id}`);
};
export const createCare = (data: any) => {
  return api.post("/cuidado/create", data);
};

export const updateCare= (id: number, data: any) => {
  return api.put(`/cuidado/update/${id}`, data);
};

export const deleteCare = (id: number) => {
  return api.delete(`/cuidado/delete/${id}`);
};