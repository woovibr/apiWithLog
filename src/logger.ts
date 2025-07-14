/**
 * Sistema de logger configurável para a biblioteca apiWithLog
 * Permite substituir console.log por um logger customizado (ex: Pino) sem quebrar compatibilidade
 */

// Referência ao console global do Node.js
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

// Logger padrão que usa console
const defaultLogger: Logger = {
  log: (...args: any[]) => console.log(...args),
  error: (...args: any[]) => console.error(...args),
  warn: (...args: any[]) => console.warn(...args),
  info: (...args: any[]) => console.info(...args),
  debug: (...args: any[]) => console.debug(...args),
  trace: (...args: any[]) => console.trace(...args),
};

// Logger global configurável
let globalLogger: Logger = defaultLogger;

/**
 * Configura um logger customizado para toda a biblioteca
 * @param logger - Logger customizado que implementa a interface Logger
 */
export const setLogger = (logger: Logger): void => {
  globalLogger = logger;
};

/**
 * Reseta o logger para o padrão (console)
 */
export const resetLogger = (): void => {
  globalLogger = defaultLogger;
};

/**
 * Obtém o logger atual
 */
export const getLogger = (): Logger => {
  return globalLogger;
};

/**
 * Função de log que usa o logger configurado
 */
export const log = (...args: any[]): void => {
  globalLogger.log(...args);
};

/**
 * Função de erro que usa o logger configurado
 */
export const error = (...args: any[]): void => {
  globalLogger.error(...args);
};

/**
 * Função de warning que usa o logger configurado
 */
export const warn = (...args: any[]): void => {
  globalLogger.warn(...args);
};

/**
 * Função de info que usa o logger configurado
 */
export const info = (...args: any[]): void => {
  globalLogger.info(...args);
};

/**
 * Função de debug que usa o logger configurado
 */
export const debug = (...args: any[]): void => {
  globalLogger.debug(...args);
};

/**
 * Função de trace que usa o logger configurado
 */
export const trace = (...args: any[]): void => {
  globalLogger.trace(...args);
}; 