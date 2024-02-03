import axios from "./axios";


export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = user => axios.post(`/login`, user);
export const verifyTokenRequest = async () => axios.get(`/verify`);
export const getUserByIdRequest = async (id) => axios.post(`/getUser`, id);
export const changePasswordRequest = async (user) => axios.put(`/changePassword`, user);
export const updateUserRequest = async (user) => axios.put(`/updateUser`, user);
export const updateUserwoPasswordRequest = async (user) => axios.put(`/updateUserwoPassword`, user);