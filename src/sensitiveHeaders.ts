export const REDACTED = '[REDACTED]';

/**
 * Pseudo headers (HTTP/2 style) that are never printed.
 */
export const skippedHeaders = ['host', 'method', 'path', 'scheme', 'version'];

/**
 * Headers that carry credentials. Compared case-insensitively.
 */
export const sensitiveHeaders = [
  'authorization',
  'proxy-authorization',
  'cookie',
  'set-cookie',
  'api-access-key',
  'x-api-key',
  'x-api-signature',
  'x-woovi-authorization',
  'x-hub-signature',
  'x-hub-signature-256',
  'x-pix-authentication-debug-token',
];

const sensitiveHeaderPattern = /token|secret|signature|api[-_]?key|password/i;

export const isSkippedHeader = (name: string): boolean =>
  skippedHeaders.includes(name.toLowerCase());

export const isSensitiveHeader = (name: string): boolean =>
  sensitiveHeaders.includes(name.toLowerCase()) ||
  sensitiveHeaderPattern.test(name);

/**
 * Value that is safe to print for a header: `[REDACTED]` for credentials, the original value otherwise.
 */
export const redactHeaderValue = (name: string, value: string): string =>
  isSensitiveHeader(name) ? REDACTED : value;
