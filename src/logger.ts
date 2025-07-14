/**
 * Customizable logger system for apiWithLog library
 * Allows replacing console.log with a custom logger (e.g. Pino) without breaking compatibility
 */

// Reference to the global console of Node.js
declare const console: {
  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  trace: (...args: any[]) => void;
};

export interface Logger {
  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  trace: (...args: any[]) => void;
}

// Default logger that uses console
const defaultLogger: Logger = {
  log: (...args: any[]) => console.log(...args),
  error: (...args: any[]) => console.error(...args),
  warn: (...args: any[]) => console.warn(...args),
  info: (...args: any[]) => console.info(...args),
  debug: (...args: any[]) => console.debug(...args),
  trace: (...args: any[]) => console.trace(...args),
};

// Global configurable logger
let globalLogger: Logger = defaultLogger;

/**
 * Configures a custom logger for the entire library
 * @param logger - Custom logger that implements the Logger interface
 */
export const setLogger = (logger: Logger): void => {
  globalLogger = logger;
};

/**
 * Resets the logger to the default (console)
 */
export const resetLogger = (): void => {
  globalLogger = defaultLogger;
};

/**
 * Gets the current logger
 */
export const getLogger = (): Logger => {
  return globalLogger;
};

/**
 * Function to log with the configured logger
 */
export const log = (...args: any[]): void => {
  globalLogger.log(...args);
};

/**
 * Function to log errors with the configured logger
 */
export const error = (...args: any[]): void => {
  globalLogger.error(...args);
};

/**
 * Function to log warnings with the configured logger
 */
export const warn = (...args: any[]): void => {
  globalLogger.warn(...args);
};

/**
 * Function to log info with the configured logger
 */
export const info = (...args: any[]): void => {
  globalLogger.info(...args);
};

/**
 * Function to log debug with the configured logger
 */
export const debug = (...args: any[]): void => {
  globalLogger.debug(...args);
};

/**
 * Function to log trace with the configured logger
 */
export const trace = (...args: any[]): void => {
  globalLogger.trace(...args);
}; 