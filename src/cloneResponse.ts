// This function clone the response consume your body and return the same response
// `clone()` is broken in `node-fetch` and results in a stalled Promise
// for responses above a certain size threshold. So construct a similar
// clone ourselves...
type CloneResponse = {
  responseCopy: Response;
  text: string;
  json: string;
};

export const cloneResponse = async (
  response: Response,
  responseText?: string | null,
): Promise<CloneResponse> => {
  const text = responseText ?? (await response.text());

  let json = null;

  try {
    json = JSON.parse(text);
  } catch (err) {
    // eslint-disable-next-line
  }

  // eslint-disable-next-line
  // @ts-ignore
  const ResponseConstructor = fetch.Response || global.Response || response.constructor;

  const responseCopy = new ResponseConstructor(text, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    // These are not spec-compliant `Response` options, but `node-fetch`
    // has them.
    ok: response?.ok,
    size: response?.size,
    url: response?.url,
  });

  return {
    responseCopy,
    text,
    json,
  };
};
