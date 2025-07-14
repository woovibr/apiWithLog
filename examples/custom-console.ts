/**
 * Custom console example with apiWithLog library
 * 
 * This example shows how to create a custom logger without external dependencies
 * that adds timestamps and formatting to logs
 */

import { setLogger, apiWithLog } from '../src/index.ts';

// Local Logger interface for testing
interface Logger {
  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  trace: (...args: any[]) => void;
}

// Custom console that adds timestamps and formatting
const customLogger: Logger = {
  log: (...args: any[]) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [INFO]`, ...args);
  },
  error: (...args: any[]) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [ERROR]`, ...args);
  },
  warn: (...args: any[]) => {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] [WARN]`, ...args);
  },
  info: (...args: any[]) => {
    const timestamp = new Date().toISOString();
    console.info(`[${timestamp}] [INFO]`, ...args);
  },
  debug: (...args: any[]) => {
    const timestamp = new Date().toISOString();
    console.debug(`[${timestamp}] [DEBUG]`, ...args);
  },
  trace: (...args: any[]) => {
    const timestamp = new Date().toISOString();
    console.trace(`[${timestamp}] [TRACE]`, ...args);
  },
};

// Configure custom console as the library's logger
setLogger(customLogger);

// Example usage of the library with custom console
async function exampleUsage() {
  try {
    console.log('Starting request to external API');
    
    // Now all library logs go to the custom console
    const response = await apiWithLog('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'GET',
    });

    const data = await response.json();
    console.log('Response received successfully:', {
      status: response.status,
      dataSize: JSON.stringify(data).length
    });
    
    console.log('Data:', data);
  } catch (error) {
    console.error('Request error:', error);
  }
}

// To reset to default behavior (console.log)
// resetLogger();

exampleUsage(); 