import express from 'express';
import { NODE_ENV, PORT } from '../config/env';

export default function(server: express.Application): void {
  if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, (error: boolean): void => {
      if (error) {
        console.error('ERROR - Unable to start server.');
      } else {
        console.info(
          `INFO - Server started on http://localhost:${PORT} [${NODE_ENV}]`
        );
      }
    });
  }
}
