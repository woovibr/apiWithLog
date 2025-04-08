export const blocklist = [
  'password',
  'newPassword',
  'transational_password',
  'client_secret',
  'expMonth',
  'expYear',
  'cvv',
  'number',
  'AccessToken',
  'Api-Access-Key',
  'Authorization',
];

export const filterPassword = (
  obj: Record<string, unknown> | null,
): Record<string, unknown> => {
  if (!obj) {
    return obj;
  }

  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];

    if (Array.isArray(value)) {
      return {
        ...acc,
        [key]: value,
      };
    }

    if (typeof value === 'object') {
      const sanitize = filterPassword(value);

      return {
        ...acc,
        [key]: sanitize,
      };
    }

    if (blocklist.includes(key)) {
      return {
        ...acc,
        [key]: '********',
      };
    }

    return {
      ...acc,
      [key]: value,
    };
  }, {});
};
