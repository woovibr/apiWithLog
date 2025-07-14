# Custom Logger Integration

The `@woovi/apiwithlog` library now supports custom logger integration (Pino, Winston, etc.) while maintaining backward compatibility.

## Quick Start

```typescript
import pino from 'pino';
import { setLogger } from '@woovi/apiwithlog';

// Configure Pino
const logger = pino({
  level: 'info',
  transport: { target: 'pino-pretty' }
});

// Set custom logger
setLogger({
  log: (...args) => logger.info(args.join(' ')),
  error: (...args) => logger.error(args.join(' ')),
  warn: (...args) => logger.warn(args.join(' ')),
  info: (...args) => logger.info(args.join(' ')),
  debug: (...args) => logger.debug(args.join(' ')),
  trace: (...args) => logger.trace(args.join(' ')),
});

// All library logs now go to Pino
```

## API

### `setLogger(logger: Logger)`
Configure a custom logger for the entire library.

### `resetLogger()`
Reset to default console logger.

### `getLogger()`
Get the current logger instance.

### Logger Interface
```typescript
interface Logger {
  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  trace: (...args: any[]) => void;
}
```

## Examples

### Winston
```typescript
import winston from 'winston';
import { setLogger } from '@woovi/apiwithlog';

const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console()]
});

setLogger({
  log: (...args) => logger.info(args.join(' ')),
  error: (...args) => logger.error(args.join(' ')),
  warn: (...args) => logger.warn(args.join(' ')),
  info: (...args) => logger.info(args.join(' ')),
  debug: (...args) => logger.debug(args.join(' ')),
  trace: (...args) => logger.silly(args.join(' ')),
});
```

### Custom Console
```typescript
import { setLogger } from '@woovi/apiwithlog';

setLogger({
  log: (...args) => console.log('[API]', new Date().toISOString(), ...args),
  error: (...args) => console.error('[API ERROR]', new Date().toISOString(), ...args),
  warn: (...args) => console.warn('[API WARN]', new Date().toISOString(), ...args),
  info: (...args) => console.info('[API INFO]', new Date().toISOString(), ...args),
  debug: (...args) => console.debug('[API DEBUG]', new Date().toISOString(), ...args),
  trace: (...args) => console.trace('[API TRACE]', new Date().toISOString(), ...args),
});
```

## Migration

- **Existing projects**: No changes needed, continues using `console.log`
- **New projects**: Configure custom logger at app startup
- **Zero breaking changes**: Full backward compatibility 