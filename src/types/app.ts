// General API response
export type APIResponse<T> = {
  message: string;
  data: T;
  status: boolean;
  error: string | null;
};
