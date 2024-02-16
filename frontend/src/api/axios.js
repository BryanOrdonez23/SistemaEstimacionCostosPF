import axios from 'axios';

const instance = axios.create({
     baseURL: 'http://localhost:4000/api',
    //baseURL: 'http://10.20.137.120:4000/api',
    withCredentials: true,  
}) 

export default instance;