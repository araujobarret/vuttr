import * as request from 'supertest';
import server from '../../index';

describe('Swagger route tests', (): void => {
  test('Test api-docs', (): void => {
    request(server)
      .get('/api-docs')
      .expect(200);
  });
});
