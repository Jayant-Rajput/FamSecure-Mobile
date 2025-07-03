import { logger } from 'react-native-logs';

const config = {
  severity: 'debug',
  transport: console.log,
  transportOptions: {
    colors: {
      info: 'blue',
      warn: 'yellow',
      error: 'red',
      debug: 'grey',
    },
  },
};

const log = logger.createLogger(config);

export default log;
