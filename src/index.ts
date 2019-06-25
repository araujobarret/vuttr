import * as express from 'express';

// Start the env variables and import them
import { DB_URI, NODE_ENV } from './config/env';

import loadDatabase from './setup/database';
import loadModules from './setup/load-modules';
import loadServer from './setup/load-server';

const server: express.Application = express();

console.log('NODE ENV', NODE_ENV);

loadDatabase(DB_URI, NODE_ENV);
loadModules(server);
loadServer(server);

export default server;
