import express from 'express';
import * as cors from 'cors';
import { json, urlencoded } from 'body-parser';
import * as morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';

import router from '../controllers/tools';
import { NODE_ENV } from '../config/env';
import * as swaggerDocument from '../config/swagger.json';

export default function(server: express.Application): void {
  console.info(`INFO - loading express modules`);
  server.use(cors());
  server.use(json());
  server.use(urlencoded({ extended: true }));

  if (NODE_ENV === 'development') {
    server.use(morgan('tiny'));
  }

  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  server.use('/', router);
}
