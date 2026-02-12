import { getCurl } from './getCurl.ts';

type ResponseErrorInfo = {
  url: string;
  method: string;
  status: number;
  responseBody: string;
  curl: string;
};

type ApiReportHook = (info: ResponseErrorInfo) => void;

let onResponseError: ApiReportHook | null = null;

export const setOnResponseError = (hook: ApiReportHook): void => {
  onResponseError = hook;
};

export const resetOnResponseError = (): void => {
  onResponseError = null;
};

type ApiReportArgs = {
  init: string | URL | globalThis.Request;
  options: RequestInit;
  response: Response;
  text: string;
};

export const apiReport = ({ init, options, response, text }: ApiReportArgs): void => {
  if (response.ok || !onResponseError) {
    return;
  }
  try {
    const url = init.toString();
    const curl = getCurl(init, options);
    onResponseError({
      url,
      method: options.method || 'GET',
      status: response.status,
      responseBody: text,
      curl,
    });
  } catch (_err) {
    // do not break
  }
};
