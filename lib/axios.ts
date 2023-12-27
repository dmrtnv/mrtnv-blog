import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = process.env.URL || 'http://localhost:3000/';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export function getAxiosClientWithInterceptor(updateSession: (() => void) | null = null, router: any = null) {
  const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });

  axiosClient.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const prevRequest = error.config;

      if (error.response && error.response.status === 401 && prevRequest && !prevRequest?._retry) {
        prevRequest._retry = true;

        try {
          const result = await axios.get(`${BASE_URL}/api/refresh`);

          if (result.data.status !== 200) throw new Error('New access token was not created.');

          console.log('Access token was refreshed successfully');

          if (updateSession) {
            updateSession();
          }

          return axiosClient(prevRequest);
        } catch (err) {
          console.error(err);

          if (router) {
            router.push('/login');
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return axiosClient;
}

const axiosClient = getAxiosClientWithInterceptor();

export default axiosClient;
