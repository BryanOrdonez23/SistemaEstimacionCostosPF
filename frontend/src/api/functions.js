import axios from "./axios";


export const createFunctionsRequest = (id, funcion) => axios.post(`/functions/${id}`, funcion);
export const getFunctionsRequest = async (id) => axios.get(`/functions/${id}`);
export const getFunctionRequest = async (id) => axios.get(`/function/${id}`);
export const updateFunctionRequest = async (id1,id2, proyect) => axios.put(`/functions/${id1}/${id2}`, proyect);
export const deleteFunctionRequest = async (id1,id2) => axios.delete(`/functions/${id1}/${id2}`);