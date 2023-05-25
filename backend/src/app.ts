import express from 'express';
import config from './util/config';
import logger from './util/logger';

const app = express();

app.get('/', (req, res) => {
  return res.send('Hello world');
});

app.listen(config.PORT, () => {
  logger.info(`Server listening on PORT -> ${config.PORT}`);
});
