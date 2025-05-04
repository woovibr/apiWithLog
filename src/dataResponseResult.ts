export type DataResponseResult<TData, TError> =
  | {
  ok: true;
  response: globalThis.Response;
  data: TData;
}
  | {
  ok: false;
  response: globalThis.Response;
  data: TError;
};

export const dataResponseResult = <TData, TError = TData>(
  data: TData | TError,
  response: globalThis.Response,
): DataResponseResult<TData, TError> => {
  if (!response.ok) {
    return {
      ok: false,
      data: data as TError,
      response: response,
    };
  }

  return {
    ok: true,
    data: data as TData,
    response: response,
  };
};
