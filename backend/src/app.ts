import express from 'express';
import cors from 'cors';
import config from './util/config';
import logger from './util/logger';
import baseRouter from './baseRouter';
import handleError from './util/handleError';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1', baseRouter);
app.use(handleError);

app.listen(config.PORT, () => {
  logger.info(`Server listening on PORT -> ${config.PORT}`);
});
