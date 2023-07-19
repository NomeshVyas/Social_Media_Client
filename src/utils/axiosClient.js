import axios from 'axios';
import { getItem, removeItem, setItem } from './localStorageManager';

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true
})

axiosClient.interceptors.request.use(
    (request) => {
        try {
            const authToken = getItem("authToken");
            request.headers["Authorization"] = `Bearer ${authToken}`;
            return request;
        } catch (err) {
            console.log('error in request interceptor', err);
        }
    }
)

axiosClient.interceptors.response.use(
    async (res) => {
        try {
            const data = res.data;
            if (data.status === 'OK') {
                return res;
            }

            const originalRequest = res.config;
            const statusCode = data.statusCode;
            const error = data.error;

            //// when refresh token expires, send user to login page
            if (statusCode === 401 && originalRequest.url === '/auth/refresh') {
                removeItem('authToken');
                window.location.replace('/login', '_self');
                return Promise.reject(error);
            }

            if (statusCode === 401) {
                const response = await axiosClient.get('/auth/refresh');
                console.log("response from backend", response);

                if (response.data.status === 'OK') {
                    setItem('authToken', response.data.result.authToken);
                    const authToken = getItem('authToken');
                    originalRequest.headers["Authorization"] = `Bearer ${authToken}`;
                }
                return axios(originalRequest);
            }
            return Promise.reject(error);
        } catch (err) {
            console.log("error in response interceptor", err);
        }
    }
)