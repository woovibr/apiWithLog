import chalk from 'chalk';

import { getCurl } from './getCurl.ts';
import { debugConsole } from './debugConsole.ts';
import { ignoredHeaders } from './logSecurity.ts';
import zlib from 'node:zlib';
import { sanitizeBody } from './sanitizeBody.ts';
import { log } from './logger.ts';

const getCleanBody = (options: RequestInit): { body?: string } => {
  if (!options.body) {
    return {};
  }

  if (options.headers) {
    if (options.headers['X-Woovi-Proxy'] === 'true') {
      try {
        const result = zlib.gunzipSync(options.body);

        const parsed = JSON.parse(result.toString());

        const body = zlib.gunzipSync(Buffer.from(parsed.body));

        return {
          body: JSON.stringify({
            ...parsed,
            body: body.toString(),
          }),
        };
      } catch (e) {
        // ignore
      }
    }

    if (options.headers['Content-Encoding'] === 'gzip') {
      try {
        const result = zlib.gunzipSync(options.body);

        return {
          body: result.toString(),
        };
      } catch (e) {
        // ignore
      }
    }
  }

  if (typeof options.body === 'string') {
    return {
      body: sanitizeBody(options.body),
    };
  }

  return {
    body: options.body,
  };
};

type ApiDebug = {
  init: string | URL | globalThis.Request;
  options: RequestInit;
  durationTime: number;
  getBody: () => Record<string, string>;
  response: Response;
};
export const apiDebug = async ({
  init,
  options,
  durationTime,
  getBody,
  response,
}: ApiDebug) => {
  const isDebug = ['true', 'api', '*'].includes(process.env.DEBUG);

  if (!isDebug) {
    return;
  }

  // eslint-disable-next-line
  const { agent, dispatcher, headers, ...optionsWithoutAgent } = options;

  const cleanHeaders = Object.keys(headers || {}).reduce((acc, key) => {
    if (!headers || ignoredHeaders.includes(key)) {
      return acc;
    }
  
    return {
      ...acc,
      [key]: (headers as Record<string, string>)[key],
    };
  }, {});

  const cleanOptions = {
    ...optionsWithoutAgent,
    headers: cleanHeaders,
    ...getCleanBody(options),
  };

  const responseHeaders = Object.fromEntries(response.headers.entries());

  const curl = getCurl(init, options);
  log(`${chalk.yellow(options.method || 'GET')} - ${chalk.blue(init.toString())}`);
  debugConsole({
    time: `${durationTime}ms`,
    init,
    agent: !!agent,
    dispatcher: !!dispatcher,
    options: cleanOptions,
    // text,
    // json,
    ...getBody(),
    ok: response.ok,
    status: response.status,
    responseHeaders,
    curl,
  });
};
