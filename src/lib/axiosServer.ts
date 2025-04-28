import axios from 'axios';
import { getCookieInServer } from './cookie/server';
import { redirect } from 'next/navigation';
import PATHS from '@/constants/paths';

const axiosServer = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  adapter: 'fetch',
});

axiosServer.interceptors.request.use(async (config) => {
  const token = await getCookieInServer('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosServer.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await getCookieInServer('refreshToken');
      if (!refreshToken) {
        redirect(`${PATHS.LOGIN}`);
      }

      try {
        const res = await axios.post(
          `${process.env.API_URL}/auth/refresh-token`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' }, adapter: 'fetch' }
        );

        const newAccessToken = res.data?.accessToken;
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosServer(originalRequest);
        }
      } catch {
        redirect(`${PATHS.LOGIN}`);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosServer;
