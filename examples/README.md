# Usage Examples

This directory contains practical examples of how to integrate custom loggers with the `@woovi/apiwithlog` library.

## Examples

- `pino-integration.ts` - Pino integration example
- `winston-integration.ts` - Winston integration example  
- `custom-console.ts` - Custom console example

## Quick Setup

Install dependencies:
```bash
# For Pino example
npm install pino pino-pretty

# For Winston example
npm install winston

# For custom console example
# No additional dependencies needed
```

Run examples:
```bash
npx tsx examples/pino-integration.ts
npx tsx examples/winston-integration.ts
npx tsx examples/custom-console.ts
```

## Quick Integration for Your Project

Add this to your app startup:

```typescript
import pino from 'pino';
import { setLogger } from '@woovi/apiwithlog';

const logger = pino({
  level: 'info',
  transport: { target: 'pino-pretty' }
});

setLogger({
  log: (...args) => logger.info(args.join(' ')),
  error: (...args) => logger.error(args.join(' ')),
  warn: (...args) => logger.warn(args.join(' ')),
  info: (...args) => logger.info(args.join(' ')),
  debug: (...args) => logger.debug(args.join(' ')),
  trace: (...args) => logger.trace(args.join(' ')),
});

// All library logs now go to Pino!
```

## Benefits

- **Structured logs**: All library logs follow your logger format
- **Level control**: Control which logs appear based on configured level
- **Tool integration**: Logs can be sent to monitoring systems
- **Performance**: Loggers like Pino are optimized for performance
- **Compatibility**: Existing projects continue working without changes 