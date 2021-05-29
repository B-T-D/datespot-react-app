import axios from 'axios';

export const apiUrlRoot = 'http://localhost:8000/api/v1/'; // Without 'http://', even maximally permissive CORS policy blocks the requests

export const axiosInstance = axios.create({
    baseURL: apiUrlRoot,
    timeout: 5000,
})