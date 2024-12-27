// fix @tagged-union
export type DataResponse<T> = T extends false
  ? {
      data: T;
      response: Response;
    }
  : T extends string
    ? { data: T; message: T; response: Response }
    : T & { response: Response };

// bind response to data
export const dataResponse = <T>(
  data: T,
  response: Response,
): DataResponse<T> => {
  if (!data) {
    return {
      data,
      response,
    } as DataResponse<T>;
  }

  if (typeof data === 'string') {
    return {
      data,
      message: data,
      response,
    } as DataResponse<T>;
  }

  data.response = response;

  return data as DataResponse<T>;
};

export const dataResponseRemove = <T>(data: T) => {
  if (!data?.response) {
    return data;
  }

  // eslint-disable-next-line
  const { response, ...restData } = data;

  return restData;
};
