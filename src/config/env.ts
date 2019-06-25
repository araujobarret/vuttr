import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../.env') });

export const NODE_ENV = process.env.NODE_ENV;

export const PORT = process.env.PORT;

export const DB_URI = process.env.DB_URI;
