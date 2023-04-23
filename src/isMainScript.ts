import path from 'path';

const cwd = process.cwd();

// make it stable for all
// node
// yarn w
// yarn b
// yarn es
export const isMainScript = (require: NodeJS.Require, module: NodeJS.Module, filename: string) => {
  // webpack_entry is the real
  if (process.env.WEBPACK_ENTRY) {
    const fullEntry = path.join(cwd, process.env.WEBPACK_ENTRY);
    const fullFilename = path.join(cwd, filename);

    if (fullEntry === fullFilename) {
      return true;
    }

    return false;
  }

  if (!module.parent) {
    return true;
  }

  if (process.env.DEBUG === 'true') {
    // eslint-disable-next-line
    console.log('not main script, check your script code');
  }

  return false;
};
