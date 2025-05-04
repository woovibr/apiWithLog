export type JsonOrText<T> = T extends string ? T : T;

export const jsonOrText = async <T>(
  response: Response,
): Promise<JsonOrText<T>> => {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    return text as JsonOrText<T>;
  }
};
