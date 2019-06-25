import * as request from 'supertest';
import server from '../../index';

interface Tool {
  _id?: string;
  title: string;
  description: string;
  link: string;
  tags?: string[];
}

describe('Tools routes tests', (): void => {
  const toolObj: Tool = {
    title: 'Test tool model',
    description: 'Some description',
    link: 'https://google.com',
    tags: ['special3'],
  };

  test('Test application get route', (done): void => {
    request(server)
      .get('/tools')
      .expect(200)
      .end(function(err): void {
        if (err) done(err);
        done();
      });
  });

  test('Test application post route', (done): void => {
    request(server)
      .post('/tools')
      .send(toolObj)
      .expect(200)
      .end(function(err, res): void {
        if (err) done(err);
        toolObj._id = res.body._id;
        done();
      });
  });

  test('Test application get/:id route with an invalid id', (done): void => {
    request(server)
      .get(`/tools/151515`)
      .expect(400)
      .end(function(err, {}): void {
        if (err) done(err);
        done();
      });
  });

  test('Test application should get/:id route with a valid id', (done): void => {
    request(server)
      .get(`/tools/${toolObj._id}`)
      .expect(200)
      .end(function(err, {}): void {
        if (err) done(err);
        done();
      });
  });

  test('Test application get/ filtering from a tag', async (): Promise<
    void
  > => {
    const res = await request(server)
      .get(`/tools?tag=${toolObj.tags[0]}`)
      .expect(200);
    res.body.map((e: Tool): void => {
      expect(e.tags.includes(toolObj.tags[0])).toBeTruthy();
    });
  });

  test('Test application delete', (done): void => {
    request(server)
      .delete(`/tools/${toolObj._id}`)
      .expect(200)
      .end(function(err, {}): void {
        if (err) done(err);
        done();
      });
  });
});
