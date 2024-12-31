/**
 * DEBUG=api,worker pnpm graphql
 * const debug = getDebug('api');
 *
 * debug('message'); // api message
 * debug.inspect(obj); // api { obj }
 */
import {debugConsole} from './debugConsole.ts';


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
  function log(...args) {
    const isEnabled = isLogEnabled(name);

    if (!isEnabled) {
      return;
    }

    const logArgs = name !== '*' ? [`${name} `, ...args] : args;

    // eslint-disable-next-line
    console.log.apply(this, logArgs);
  }

  function trace(...args) {
    const isEnabled = isLogEnabled(name);

    if (!isEnabled) {
      return;
    }

    const logArgs = name !== '*' ? [`${name} `, ...args] : args;

    // eslint-disable-next-line
    console.trace.apply(this, logArgs);
  }

  function inspect() {
    const isEnabled = isLogEnabled(name);

    if (!isEnabled) {
      return;
    }

    debugConsole.apply(this, arguments);
  }

  const debug = log;

  debug.inspect = inspect;
  debug.trace = trace;

  return debug;
};
