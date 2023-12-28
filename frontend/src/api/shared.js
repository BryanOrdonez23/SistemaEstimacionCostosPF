import axios from "./axios";

export const createProyectSharedRequest = (proyect) => axios.post(`/share`, proyect);
export const getProyectsSharedRequest = () => axios.get(`/share`);