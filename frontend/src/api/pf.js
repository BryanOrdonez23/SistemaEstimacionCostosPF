import axios from "./axios";


export const calcuarPFSARequest = async (id) => axios.get(`/calcularpfsa/${id}`);
export const getFactoresAjusteRequest = async () => axios.get(`/getfactoresajuste`);