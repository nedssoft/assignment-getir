const request = require('supertest');
const server = require('../server');
const getCollection = require('../db');

describe('DB Collection', () => {
  it('should create connection to the mongodb server', async () => {
    const connection = getCollection('records');
    expect(connection).resolves.toBeTruthy();
  });
});
describe('RECORDS', () => {
  it('should fail if the request payload is missing', async () => {
    const response = await request(server).post('/api/records').send({});
    expect(response.statusCode).toEqual(422);
    expect(response.body.msg).toEqual('Request payload missing required field');
  });

  it('should fail if date format is incorrect', async () => {
    const response = await request(server).post('/api/records').send({
      startDate: '26-01-2016',
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000,
    });
    expect(response.statusCode).toEqual(422);
    expect(response.body.msg).toEqual(
      'startDate and endDate must be of the format YYYY-MM-DD',
    );
  });

  it('should return records', async () => {
    const response = await request(server).post('/api/records').send({
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000,
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body.code).toEqual(0);
    expect(response.body.msg).toEqual('Success');
    expect(response.body).toHaveProperty('records');
  });
});
