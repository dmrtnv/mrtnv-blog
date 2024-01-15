import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const api = axios.create({
  baseURL: `/api/`,
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const prevRequest = error.config;

    if (error.response && error.response.status === 401 && prevRequest && !prevRequest?._retry) {
      prevRequest._retry = true;

      try {
        const result = await axios.get(`/api/refresh`);

        if (result.data.status !== 200) throw new Error('New access token was not created.');

        console.log('Access token was refreshed successfully');

        return api(prevRequest);
      } catch (err) {
        // console.error(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
