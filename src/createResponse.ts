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

  const responseBody = body ?? responseOptions;

  try {
    return new Response(JSON.stringify(responseBody), responseOptions);
  } catch (error) {
    return responseOptions;
  }
};
