import { Response } from "node-fetch";

export const jsonOrText = async (
  response: Response,
): Promise<string | Record<string, unknown>> => {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    return text;
  }
};
