import axios from "./axios";


export const createInvolucradosRequest = (id, involucrados) => axios.post(`/guardarInvolucrado/${id}`, involucrados);
export const getInvolucradosRequest = (id) => axios.get(`/involucrados/${id}`);
export const getInvolucradoRequest = (id) => axios.get(`/involucrado/${id}`);
export const updateInvolucradoRequest = (id1, id2, involucrado) => axios.put(`/actualizarInvolucrado/${id1}/${id2}`, involucrado);
export const deleteInvolucradoRequest = (id1, id2) => axios.delete(`/eliminarInvolucrado/${id1}/${id2}`);
export const sumatoriaCostosInvolucradosRequest = (id) => axios.get(`/sumaInvolucrados/${id}`);
export const promedioSueldosInvolucradosRequest = (id) => axios.get(`/promedioSueldosInvolucrados/${id}`);
export const contarInvolucradosRequest = (id) => axios.get(`/contarInvolucrados/${id}`);