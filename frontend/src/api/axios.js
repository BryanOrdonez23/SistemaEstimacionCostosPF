import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://computacion.unl.edu.ec/apps/costoB/api',
    withCredentials: true,  
}) 

export default instance;