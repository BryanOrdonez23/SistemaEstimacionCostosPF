import axios from "./axios";


export const createProyectRequest = (proyect) => axios.post(`/proyecto`, proyect);
export const getProyectsRequest = async () => axios.get(`/proyectos`);
export const getProyectRequest = async (id) => axios.get(`/proyecto/${id}`);
export const updateProyectRequest = async (id, proyect) => axios.put(`/proyecto/${id}`, proyect);
export const deleteProyectRequest = async (id) => axios.put(`/deleteproyecto/${id}`);