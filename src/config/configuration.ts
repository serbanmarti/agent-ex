export default () => {
  let envConfig = {};
  const env = process.env.NODE_ENV || 'development';
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    envConfig = require(`./config.${env}`).default;
  } catch (_e) {
    throw new Error(`No config found for NODE_ENV=${env}`);
  }

  return envConfig;
};
