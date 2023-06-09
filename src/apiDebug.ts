import chalk from 'chalk';

import { debugConsole } from './debugConsole';

import { getCurl } from './getCurl';
import { ignoredHeaders } from './logSecurity';

type ApiDebug = {
  init: RequestInfo;
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
  if (process.env.DEBUG !== 'true') {
    return;
  }

  // eslint-disable-next-line
  const { agent, headers, ...optionsWithoutAgent } = options as  {headers: Record<string, string>, agent: string};

  const cleanHeaders = Object.keys(headers || {}).reduce((acc, key) => {
    if (ignoredHeaders.includes(key) || !headers) {
      return acc;
    }

    return {
      ...acc,
      [key]: headers[key],
    };
  }, {});

  const cleanOptions = {
    ...optionsWithoutAgent,
    headers: cleanHeaders,
  };

  const curl = getCurl(init, options);
  // eslint-disable-next-line
  console.log(chalk.yellow(options.method || 'GET'), chalk.blue(init));
  // eslint-disable-next-line
  debugConsole({
    time: `${durationTime}ms`,
    init,
    options: cleanOptions,
    // text,
    // json,
    ...getBody(),
    ok: response.ok,
    status: response.status,
    curl,
  });
};
