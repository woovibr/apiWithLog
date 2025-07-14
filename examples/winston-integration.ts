/**
 * Winston integration example with apiWithLog library
 * 
 * This example shows how to configure Winston as a custom logger
 * to replace console.log from the library
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

// Mock Winston logger for testing (no external dependency)
const mockWinstonLogger = {
  info: (...args: any[]) => console.log('[WINSTON INFO]', ...args),
  error: (...args: any[]) => console.error('[WINSTON ERROR]', ...args),
  warn: (...args: any[]) => console.warn('[WINSTON WARN]', ...args),
  debug: (...args: any[]) => console.debug('[WINSTON DEBUG]', ...args),
  silly: (...args: any[]) => console.trace('[WINSTON SILLY]', ...args),
};

// Winston adapter for the library's Logger interface
const winstonAdapter: Logger = {
  log: (...args: any[]) => {
    // Convert console.log to winston.info
    mockWinstonLogger.info(args.join(' '));
  },
  error: (...args: any[]) => {
    mockWinstonLogger.error(args.join(' '));
  },
  warn: (...args: any[]) => {
    mockWinstonLogger.warn(args.join(' '));
  },
  info: (...args: any[]) => {
    mockWinstonLogger.info(args.join(' '));
  },
  debug: (...args: any[]) => {
    mockWinstonLogger.debug(args.join(' '));
  },
  trace: (...args: any[]) => {
    // Winston doesn't have trace, use silly as alternative
    mockWinstonLogger.silly(args.join(' '));
  },
};

// Configure Winston as the library's logger
setLogger(winstonAdapter);

// Example usage of the library with Winston
async function exampleUsage() {
  try {
    console.log('=== WINSTON INTEGRATION TEST ===');
    console.log('Starting request to external API');
    
    // Enable library logs
    process.env.DEBUG = 'true';
    
    // Now all library logs go to Winston
    const response = await apiWithLog('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'GET',
    });

    const data = await response.json();
    console.log('Response received successfully:', {
      status: response.status,
      dataSize: JSON.stringify(data).length
    });
    
    console.log('Data:', data);
    console.log('=== TEST COMPLETED ===');
  } catch (error) {
    console.error('Request error:', error);
  }
}

// To reset to default behavior (console.log)
// resetLogger();

exampleUsage(); 