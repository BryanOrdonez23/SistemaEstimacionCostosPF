import axios from "./axios";

export const createProyectSharedRequest = (proyect) => axios.post(`/share`, proyect);
export const getProyectsSharedRequest = () => axios.get(`/share`);
export const getProyectsSharedByProyectRequest = (proyectId) => axios.post(`/getProyectsShared`, proyectId);
export const deleteProyectSharedRequest = (id) => axios.delete(`/deleteProyectShared/${id}`);
export const getSolicitudesProyectosSharedRequest = (proyectId) => axios.post(`/getSolicitudesProyectosShared`, proyectId);
export const updateStatusProyectSharedRequest = (proyectId) => axios.post(`/updateStatusProyectShared`, proyectId);