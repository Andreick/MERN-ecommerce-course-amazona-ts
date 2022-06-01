import { AxiosError } from 'axios';

const getError = (err: unknown): string => {
  if (err instanceof AxiosError) {
    const message = err.response?.data.message;
    if (message) return message;
    return err.message;
  }
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  throw err;
};

export default getError;
