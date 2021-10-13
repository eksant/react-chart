interface IApiMeta {
  status: number;
}

export interface IApiResponse {
  meta: IApiMeta;
  data?: any;
  error?: {
    code: number;
    message: string;
  };
}
