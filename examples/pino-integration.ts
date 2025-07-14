/**
 * Pino integration example with apiWithLog library
 * 
 * This example shows how to configure Pino as a custom logger
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

// Mock Pino logger for testing (no external dependency)
const mockPinoLogger = {
  info: (...args: any[]) => console.log('[PINO INFO]', ...args),
  error: (...args: any[]) => console.error('[PINO ERROR]', ...args),
  warn: (...args: any[]) => console.warn('[PINO WARN]', ...args),
  debug: (...args: any[]) => console.debug('[PINO DEBUG]', ...args),
  trace: (...args: any[]) => console.trace('[PINO TRACE]', ...args),
};

// Pino adapter for the library's Logger interface
const pinoAdapter: Logger = {
  log: (...args: any[]) => {
    // Convert console.log to pino.info
    mockPinoLogger.info(args.join(' '));
  },
  error: (...args: any[]) => {
    mockPinoLogger.error(args.join(' '));
  },
  warn: (...args: any[]) => {
    mockPinoLogger.warn(args.join(' '));
  },
  info: (...args: any[]) => {
    mockPinoLogger.info(args.join(' '));
  },
  debug: (...args: any[]) => {
    mockPinoLogger.debug(args.join(' '));
  },
  trace: (...args: any[]) => {
    mockPinoLogger.trace(args.join(' '));
  },
};

// Configure Pino as the library's logger
setLogger(pinoAdapter);

// Example usage of the library with Pino
async function exampleUsage() {
  try {
    console.log('=== PINO INTEGRATION TEST ===');
    console.log('Starting request to external API');
    
    // Enable library logs
    process.env.DEBUG = 'true';
    
    // Now all library logs go to Pino
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