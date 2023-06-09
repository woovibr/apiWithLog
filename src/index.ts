if(typeof fetch === 'undefined'){
  const errorMessage = 'The Fetch API is not available. Please ensure that you are running your code in an environment that supports the Fetch API.'
  throw new Error(errorMessage);
}

export { apiWithLog } from './apiWithLog'
