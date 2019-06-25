import express from 'express';
import { PORT, NODE_ENV } from '../config/env';

export default function(server: express.Application): void {
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
