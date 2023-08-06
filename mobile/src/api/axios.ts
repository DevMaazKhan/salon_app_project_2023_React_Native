import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.100.137:4000/api/v1',
});

export {axiosInstance};
