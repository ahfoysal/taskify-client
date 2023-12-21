export interface IMeta {
  limit: number;
  page: number;
  size: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type ResponseErrorType = {
  statusCode: number;
  message: string;
  errorMessages: ErrorMessages[];
};
export type ErrorMessages = {
  path: string;
  message: string;
};
