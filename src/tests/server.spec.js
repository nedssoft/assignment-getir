const request = require('supertest');
const server = require('../server');

describe('SERVER', () => {
  it('should confirm the server is running', async () => {
    const res = await request(server).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status');
  });
});