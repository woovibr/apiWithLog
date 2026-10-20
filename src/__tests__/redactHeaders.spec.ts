import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import 'vitest-fetch-mock';

import { apiWithLog } from '../apiWithLog.ts';
import { getCurl } from '../getCurl.ts';
import { resetLogger, setLogger } from '../logger.ts';
import { cleanupTest } from '../../testutils/cleanupTest';

const SECRET = 'super-secret-value';

const captureLogs = () => {
  const lines: string[] = [];
  const capture = (...args: unknown[]) => lines.push(args.map(String).join(' '));

  setLogger({
    log: capture,
    error: capture,
    warn: capture,
    info: capture,
    debug: capture,
    trace: capture,
  });

  return lines;
};

beforeEach(async () => {
  await cleanupTest();
  process.env.DEBUG = 'true';
});

afterEach(() => {
  delete process.env.DEBUG;
  resetLogger();
});

it('should redact credentials from the curl and debug logs of a plain-object request', async () => {
  const lines = captureLogs();

  fetchMock.mockResponseOnce(JSON.stringify({ ok: true }));

  await apiWithLog('http://localhost:5001/v2/kyc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': SECRET,
      'X-API-Signature': SECRET,
      'x-woovi-authorization': SECRET,
      Cookie: SECRET,
      Authorization: SECRET,
    },
    body: JSON.stringify({ name: 'woovi' }),
  });

  const output = lines.join('\n');

  expect(output).not.toContain(SECRET);
  expect(output).toContain('-H "X-API-Key: [REDACTED]"');
  expect(output).toContain('-H "x-woovi-authorization: [REDACTED]"');
  expect(output).toContain('-H "Authorization: [REDACTED]"');
  expect(output).toContain('-H "Content-Type: application/json"');
  expect(output).toContain('-H "user-agent: node-fetch"');
});

it('should redact mixed-case and pattern-matched header names', () => {
  const curl = getCurl('http://localhost/x' as never, {
    headers: {
      'X-Api-Key': SECRET,
      'X-Custom-Token': SECRET,
      'X-Client-Secret': SECRET,
      'Proxy-Authorization': SECRET,
      Accept: 'application/json',
    },
  });

  expect(curl).not.toContain(SECRET);
  expect(curl).toContain('-H "X-Api-Key: [REDACTED]"');
  expect(curl).toContain('-H "X-Custom-Token: [REDACTED]"');
  expect(curl).toContain('-H "X-Client-Secret: [REDACTED]"');
  expect(curl).toContain('-H "Proxy-Authorization: [REDACTED]"');
  expect(curl).toContain('-H "Accept: application/json"');
});

it('should redact credentials when headers is a Headers instance (lower-case names)', () => {
  const headers = new Headers({
    Authorization: SECRET,
    'X-Api-Key': SECRET,
    'x-hub-signature-256': SECRET,
    'Content-Type': 'application/json',
    'User-Agent': 'node-fetch',
  });

  const curl = getCurl('http://localhost/x' as never, { headers });

  expect(curl).not.toContain(SECRET);
  expect(curl).toContain('-H "authorization: [REDACTED]"');
  expect(curl).toContain('-H "x-api-key: [REDACTED]"');
  expect(curl).toContain('-H "x-hub-signature-256: [REDACTED]"');
  expect(curl).toContain('-H "content-type: application/json"');
  expect(curl).toContain('-H "user-agent: node-fetch"');
});

it('should still skip pseudo headers', () => {
  const curl = getCurl('http://localhost/x' as never, {
    headers: { host: 'localhost', method: 'GET', path: '/x', scheme: 'http', version: '1', Accept: '*/*' },
  });

  expect(curl).toBe(`curl 'http://localhost/x' -H "Accept: */*"`);
});
