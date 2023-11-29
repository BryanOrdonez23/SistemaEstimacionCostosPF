import axios from "./axios";


export const createFunctionsRequest = (id, funcion) => axios.post(`/functions/${id}`, funcion);
export const getFunctionsRequest = async (id) => axios.get(`/functions/${id}`);
export const getFunctionRequest = async (id) => axios.get(`/functions/${id}`);
export const updateFunctionRequest = async (id, proyect) => axios.put(`/functions/${id}`, proyect);
export const deleteFunctionRequest = async (id) => axios.put(`/deletefunciones/${id}`);