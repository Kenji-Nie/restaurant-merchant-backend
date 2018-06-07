import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};

  config.security = {
    csrf: {
      enable: false
    },
  } as DefaultConfig["security"];

  try {
    config.secrets = require('./secrets');
  } catch (e) {}

  return config;
};
