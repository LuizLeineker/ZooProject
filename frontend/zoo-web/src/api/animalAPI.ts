import { api } from "./api";


export const getAnimals = () => {
  return api.get("/animals");
};

export const getAnimalById = (id: number) => {
  return api.get(`/animal/${id}`);
};

export const createAnimal = (data: any) => {
  return api.post("/animal/create", data);
};

export const updateAnimal = (id: number, data: any) => {
  return api.put(`/animal/update/${id}`, data);
};

export const deleteAnimal = (id: number) => {
  return api.delete(`/animal/delete/${id}`);
};