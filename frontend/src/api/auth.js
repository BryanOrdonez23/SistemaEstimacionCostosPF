import axios from "./axios";


export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = user => axios.post(`/login`, user);
export const verifyTokenRequest = async () => axios.get(`/verify`);
export const getUserByIdRequest = async (id) => axios.get(`/getUser/${id}`);