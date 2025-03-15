import chalk from 'chalk';

import { getCurl } from './getCurl.ts';
import { debugConsole } from './debugConsole.ts';
import { ignoredHeaders } from './logSecurity.ts';

type ApiDebug = {
  init: string | URL | globalThis.Request;
  options: RequestInit;
  durationTime: number;
  getBody: () => Record<string, string>;
  response: Response;
};
export const apiDebug = ({
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
  };

  const responseHeaders = Object.fromEntries(response.headers.entries());

  const curl = getCurl(init, options);
  // eslint-disable-next-line
  console.log(chalk.yellow(options.method || 'GET'), chalk.blue(init));
  // eslint-disable-next-line
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
    responseHeaders
    curl,
  });
};
