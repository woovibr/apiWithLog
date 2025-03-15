import { beforeEach, expect, it, vi } from 'vitest';
import DOMException from 'domexception';
import 'vitest-fetch-mock';

import { apiWithLog } from '../apiWithLog.ts';
import { jsonOrText } from '../jsonOrText.ts';
import {cleanupTest} from '../../testutils/cleanupTest';

global.DOMException = DOMException;

beforeEach(cleanupTest);

it('should call apiWithLog', async () => {
  vi.useFakeTimers();

  // /oauth/token
  fetchMock.mockResponseOnce(
    JSON.stringify({
      items: [],
    }),
  );

  const url = 'http://localhost:5001/api/openpix/v1/charge';

  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = await apiWithLog(url, options);

  const data = await jsonOrText(response);

  expect(response.ok).toBe(true);

  expect(data).toEqual({
    items: [],
  });
});