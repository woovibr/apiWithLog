import convertHrtime, { HighResolutionTime } from 'convert-hrtime';

export const timeSpan = () => {
  const start = process.hrtime.bigint();
  const end = (timeMeasure: keyof HighResolutionTime) => {
    const diff = process.hrtime.bigint() - start;
    return Number(convertHrtime(
      diff
    )[timeMeasure])
  };

  const returnValue = () => end('milliseconds');
  returnValue.rounded = () => Math.round(end('nanoseconds'));
  returnValue.seconds = () => end('seconds');
  returnValue.nanoseconds = () => end('nanoseconds');

  return returnValue;
};
