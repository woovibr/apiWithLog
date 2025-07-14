/**
 * DEBUG=api,worker pnpm graphql
 * const debug = getDebug('api');
 *
 * debug('message'); // api message
 * debug.inspect(obj); // api { obj }
 */
import {debugConsole} from './debugConsole.ts';
import { log as loggerLog, trace as loggerTrace } from './logger.ts';

// Declaração do process global
declare const process: {
  env: {
    DEBUG?: string;
  };
};

const getDebugLogs = () => {
  const logs = process.env.DEBUG?.split(',') || [];

  return logs;
};

const isLogEnabled = (name = '*') => {
  const logs = getDebugLogs();

  return logs.includes(name) || logs.includes('*') || logs.includes('true');
};

type Log = (message?: any, ...optionalParams: any[]) => void;

interface Debug {
  (message?: any, ...optionalParams: any[]): void;
  inspect: Log;
  trace: Log;
}

export const getDebug = (name = '*'): Debug => {
  function log(...args: any[]) {
    const isEnabled = isLogEnabled(name);

    if (!isEnabled) {
      return;
    }

    const logArgs = name !== '*' ? [`${name} `, ...args] : args;

    loggerLog(...logArgs);
  }

  function trace(...args: any[]) {
    const isEnabled = isLogEnabled(name);

    if (!isEnabled) {
      return;
    }

    const logArgs = name !== '*' ? [`${name} `, ...args] : args;

    loggerTrace(...logArgs);
  }

  function inspect(obj: Record<string, unknown>) {
    const isEnabled = isLogEnabled(name);

    if (!isEnabled) {
      return;
    }

    debugConsole(obj);
  }

  const debug = log as Debug;

  debug.inspect = inspect;
  debug.trace = trace;

  return debug;
};
