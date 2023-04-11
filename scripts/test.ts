import { apiWithLog } from '../src/apiWithLog';


const run = async () => {
  const url = 'https://cat-fact.herokuapp.com/facts'
  await apiWithLog(url);
};

(async () => {
  try {
    await run();
  } catch (err) {
    // eslint-disable-next-line
    console.log({
      err,
    });
    process.exit(1);
  }

  process.exit(0);
})();
