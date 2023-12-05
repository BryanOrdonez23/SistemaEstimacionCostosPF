import axios from "./axios";


export const calcuarPFSA = async (id) => axios.get(`/calcularpfsa/${id}`);