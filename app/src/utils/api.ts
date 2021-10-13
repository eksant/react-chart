import axios from 'axios';
import { IApiResponse } from '@/models';

const instance = axios.create({ baseURL: 'http://localhost:3003/api/v1/' });

const headers = (token: string) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

const getAxios = async (
  url: string,
  bearer?: string | undefined
): Promise<IApiResponse> => {
  const config = bearer ? headers(bearer) : {};

  return instance
    .get(url, config)
    .then((resp: any) => ({ ...resp.data, meta: { status: resp.status } }))
    .catch((error) => ({
      ...error.response?.data,
      meta: { status: error.response.status },
    }));
};

const postAxios = async (
  url: string,
  data?: any,
  bearer?: string | undefined
): Promise<IApiResponse> => {
  const config = bearer ? headers(bearer) : {};

  return instance
    .post(url, data, config)
    .then((resp: any) => ({ ...resp.data, meta: { status: resp.status } }))
    .catch((error) => ({
      ...error.response?.data,
      meta: { status: error.response.status },
    }));
};

const api = { getAxios, postAxios };

export default api;
