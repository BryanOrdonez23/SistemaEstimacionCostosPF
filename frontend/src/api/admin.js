import axios from "./axios";


export const registerRequest = (user) => axios.post(`admin/register`, user);
export const loginRequest = user => axios.post(`admin/login`, user);
export const verifyTokenRequest = async () => axios.get(`admin/verify`);
export const getUserByIdRequest = async (id) => axios.get(`admin/getUser/${id}`);
export const getUsersRequest = async () => axios.get(`admin/users`);
export const getUserByNameRequest = async (name) => axios.get(`admin/userbyname/${name}`);
export const deleteUserRequest = async (id) => axios.delete(`admin/user/${id}`);
export const updateUserRequest = async (id, user) => axios.put(`admin/user/${id}`, user);


// 

export const getProyectsRequest = async () => axios.get(`admin/proyectos`);
export const getProyectRequest = async (id) => axios.get(`admin/proyecto/${id}`);
export const deleteProyectRequest = async (id) => axios.put(`admin/deleteproyecto/${id}`);
export const updateProyectRequest = async (id, proyect) => axios.put(`admin/proyecto/${id}`, proyect);
export const getAllProyectsRequest = async () => axios.get(`admin/allproyectos`);

// 

export const createTipoFuncionRequest = async (tipoFuncion) => axios.post(`admin/newtiposfunciones`, tipoFuncion);
export const getTipoFuncionesRequest = async () => axios.get(`admin/tipofuncion`);
export const getTipoFuncionRequest = async (id) => axios.get(`admin/tipofuncion/${id}`);
export const updateTipoFuncionRequest = async (id, tipoFuncion) => axios.put(`admin/tipofuncion/${id}`, tipoFuncion);
export const deleteTipoFuncionRequest = async (id) => axios.delete(`admin/deletetipofuncion/${id}`);
