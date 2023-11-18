import axios from "./axios";


export const createProyectRequest = (proyect) => axios.post(`/proyecto`, proyect);
export const getProyectsRequest = async () => axios.get(`/proyectos`);
