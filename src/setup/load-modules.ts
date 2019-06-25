import express from 'express';
import * as cors from 'cors';
import { json, urlencoded } from 'body-parser';
import * as morgan from 'morgan';

import router from '../controllers/tools';
import { NODE_ENV } from '../config/env';

// Load express modules
export default function(server: express.Application): void {
  console.info(`INFO - loading express modules`);
  server.use(cors());
  server.use(json());
  server.use(urlencoded({ extended: true }));

  // logs
  if (NODE_ENV === 'development') {
    server.use(morgan('tiny'));
  }

  // Controllers/routes
  server.use('/', router);
}
