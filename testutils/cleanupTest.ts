export const cleanupTest = async () => {
  const { vi } = await import(/*webpackChunkName: "[request]"*/ 'vitest');

  const { default: createFetchMocker } = await import(
    /*webpackChunkName: "[request]"*/
    'vitest-fetch-mock'
  );

  const fetchMock = createFetchMocker(vi);

  fetchMock.enableMocks();
  fetchMock.resetMocks();
};
