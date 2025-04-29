import axios from 'axios';
import { getServerCookie } from './cookie/server';
import { redirect } from 'next/navigation';
import PATHS from '@/constants/paths';

const BASE_URL = process.env.API_URL;

const axiosServer = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  adapter: 'fetch',
});

axiosServer.interceptors.request.use(async (config) => {
  const token = await getServerCookie('accessToken');
  if (!token) return config;
  config.headers.set('Authorization', `Bearer ${token}`);
  return config;
});

axiosServer.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = await getServerCookie('refreshToken');
    if (!refreshToken) {
      redirect(`${PATHS.LOGIN}`);
    }

    const newAccessToken = await refreshAccessToken(refreshToken);
    if (!newAccessToken) {
      redirect(`${PATHS.LOGIN}`);
    }

    originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
    return axiosServer(originalRequest);
  }
);

async function refreshAccessToken(refreshToken: string) {
  try {
    const res = await axios.post(
      `${BASE_URL}/auth/refresh-token`,
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' }, adapter: 'fetch' }
    );
    return res.data?.accessToken;
  } catch {
    return null;
  }
}

export default axiosServer;
