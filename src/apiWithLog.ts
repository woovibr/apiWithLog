import chalk from 'chalk';
import { cloneResponse } from './cloneResponse.ts';
import { timeSpan } from './timeSpan.ts';
import { apiDebug }from './apiDebug.ts';
import { getRequestMock, saveRequestMock } from './apiCache.ts';
import {createResponse} from './createResponse.ts';
import {getCurl} from './getCurl.ts';
import {getDebug} from './getDebug.ts';

const debug = getDebug('api');

type RequestOptions = RequestInit & {
  shouldReport?: boolean;
};

export const apiWithLog = async (
  init: string | URL | globalThis.Request,
  optionsApi: RequestOptions = { method: 'GET' },
): Promise<Response> => {
  const end = timeSpan();

  const options = {
    ...optionsApi,
    headers: {
      ...(optionsApi.headers || {}),
      'user-agent': 'node-fetch',
    },
  };

  const requestMock = await getRequestMock(init, options);

  if (requestMock) {
    return requestMock;
  }

  return fetch(init, options).then(async (response) => {
    const durationTime = end();

    const text = await response.text();

    let json: any = null;

    try {
      json = JSON.parse(text);
    } catch (err) {
      // eslint-disable-next-line
    }

    const getBody = (): Record<string, string> => {
      if (json) {
        return {
          json,
        };
      }

      return {
        text,
      };
    };

    await saveRequestMock(init, options, text, response);

    await apiDebug({
      init,
      options,
      durationTime,
      getBody,
      response,
    });

    const { responseCopy } = await cloneResponse(response, text);

    return responseCopy;
  }).catch(async (error) => {
    const body = {
      error: error?.message,
    };

    // FetchError is more related to 5xx
    const createdResponse = await createResponse(
      {
        status: 502,
        ok: false,
      },
      body,
    );

    const curl = getCurl(init, options);
    // eslint-disable-next-line
    debug(chalk.yellow(options.method), chalk.blue(init));

    debug.inspect({
      init,
      body,
      ok: createdResponse.ok,
      status: createdResponse.status,
      curl,
    });

    return createdResponse;
  });
};
