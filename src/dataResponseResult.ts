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

export const dataResponseResult = <TData, TError>(args: {
  data: TData | TError;
  response: globalThis.Response;
}): DataResponseResult<TData, TError> => {
  if (!args.response.ok) {
    return {
      ok: false,
      data: args.data as TError,
      response: args.response,
    };
  }

  return {
    ok: true,
    data: args.data as TData,
    response: args.response,
  };
};
