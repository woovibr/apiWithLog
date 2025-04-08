import { filterPassword } from './filterPassword.ts';

export const sanitizeBody = (rawBody: string): string => {
  try {
    // Parse the JSON string
    const requestBody = JSON.parse(rawBody);

    const filtered = filterPassword(requestBody);

    return JSON.stringify(filtered);
  } catch (error) {
    // console.error('Error parsing rawBody as JSON:', error);

    return rawBody;
  }
};
