export const createResponse = async (
  options: Response,
  body?: Record<string, string>,
): Promise<Response> => {
  const Response = fetch.Response || global.Response || options.constructor;

  const responseOptions = {
    status: options.status,
    statusText: options.statusText,
    headers: options.headers,
    ok: options.ok,
    size: options.size,
    url: options.url,
  };

  const getResponseBody = () => {
    if (options?.status === 204) {
      return null;
    }

    if (body) {
      return JSON.stringify(body);
    }

    return JSON.stringify(responseOptions);
  }

  const responseBody = getResponseBody();

  try {
    return new Response(responseBody, responseOptions);
  } catch (error) {
    return responseOptions;
  }
};
