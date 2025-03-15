import { vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

vi.setConfig({
  testTimeout: 20_000,
});

vi.mock('node-abort-controller');

const fetchMocker = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();
