import axios from "./axios";

export const createOtrosGastosRequest = (id, otrosGastos) => axios.post(`/guardarOtroGasto/${id}`, otrosGastos);
export const getOtrosGastosRequest = (id) => axios.get(`/otrosGastos/${id}`);
export const getOtroGastoRequest = (id) => axios.get(`/otroGasto/${id}`);
export const updateOtroGastoRequest = (id1, id2, otroGasto) => axios.put(`/actualizarOtroGasto/${id1}/${id2}`, otroGasto);
export const deleteOtroGastoRequest = (id1, id2) => axios.delete(`/eliminarOtroGasto/${id1}/${id2}`);
export const sumatoriaCostosOtrosGastosRequest = (id) => axios.get(`/sumaotroGastos/${id}`);