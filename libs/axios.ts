import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// import { getToken } from '@/lib/auth';

const appAxios = axios.create({
  baseURL: `http://10.0.2.2:8000`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

appAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = '';
    if (config.headers) {
      // config.headers['X-APP-TOKEN'] = `${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

appAxios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (!response.data) {
      return Promise.reject(response);
    }
    return response;
  },
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default appAxios;
