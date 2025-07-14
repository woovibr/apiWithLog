import util from 'util';
import { log } from './logger.ts';
// import prettyFormat from 'pretty-format';

export const debugConsole = (obj: Record<string, unknown>) => {
  log(
    util.inspect(obj, {
      showHidden: false,
      depth: null,
      colors: true,
      showProxy: false,
    }),
  );
  // eslint-disable-next-line
  // log(prettyFormat(obj));
};
