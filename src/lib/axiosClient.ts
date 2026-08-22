import axios from 'axios';
import { getClientCookie, setClientCookie } from '@/lib/cookie/client';
import PATHS from '@/constants/paths';
import { BFF_API } from '@/constants/api';

const BASE_URL = BFF_API.entry;

const axiosClient = axios.create({
  baseURL: BFF_API.entry,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  adapter: 'fetch',
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  // const token = getClientCookie('accessToken');
  // if (!token) return config;
  // config.headers.set('Authorization', `Bearer ${token}`);
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = getClientCookie('refreshToken');
    if (!refreshToken) {
      window.location.href = `${PATHS.LOGIN}`;
      return Promise.reject(error);
    }

    const newAccessToken = await refreshAccessToken(refreshToken);
    if (!newAccessToken) {
      window.location.href = `${PATHS.LOGIN}`;
      return Promise.reject(error);
    }

    setClientCookie('accessToken', newAccessToken);
    originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
    return axiosClient(originalRequest);
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

export default axiosClient;
