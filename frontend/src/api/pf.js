import axios from "./axios";


export const calcuarPFSARequest = async (id) => axios.get(`/calcularpfsa/${id}`);
export const getFactoresAjusteRequest = async (id) => axios.get(`/getfactoresajuste`);
export const guardarFactoresAjusteRequest = async (id, factoresAjuste) => axios.post(`/guardarfactoresajuste/${id}`, factoresAjuste);
export const getValorFactoresAjusteRequest = async (id) => axios.get(`/getvalorfactoresajuste/${id}`);
export const createValorFactoresAjusteRequest = async (id, valorFactoresAjuste) => axios.post(`/createvalorfactoresajuste/${id}`, valorFactoresAjuste);
export const getPuntosFuncionRequest = async (id) => axios.get(`/getPuntosFuncion/${id}`);
export const sumaValorFactoresAjusteRequest = async (id) => axios.get(`/sumaValorFactoresAjsute/${id}`);