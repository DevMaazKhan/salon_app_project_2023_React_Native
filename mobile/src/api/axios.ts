import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.8.103:4000/api/v1',
  // headers: {
  //   'ngrok-skip-browser-warning': true,
  // },
});

export {axiosInstance};
