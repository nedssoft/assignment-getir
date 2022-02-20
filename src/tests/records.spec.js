const request = require('supertest');
const server = require('../server');
const getCollection = require('../db');
const res = require('express/lib/response');

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

  it('should return empty records if request payload is out of rage', async () => {
    const payload = {
      startDate: '1515-01-26',
      endDate: '1616-02-02',
      minCount: 2700,
      maxCount: 3000,
    };
    const response = await request(server).post('/api/records').send(payload);
    expect(response.statusCode).toEqual(200);
    expect(response.body.code).toEqual(0);
    expect(response.body.msg).toEqual('Success');
    expect(response.body).toHaveProperty('records');
    expect(response.body.records).toHaveLength(0);
  })
  it('should return records matching sample response payload', async () => {
    const payload = {
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000,
    };
    const response = await request(server).post('/api/records').send(payload);
    expect(response.statusCode).toEqual(200);
    expect(response.body.code).toEqual(0);
    expect(response.body.msg).toEqual('Success');
    expect(response.body).toHaveProperty('records');
    response.body.records.forEach((record) => {
      expect(record).toStrictEqual(
        expect.objectContaining({
          key: expect.any(String),
          createdAt: expect.any(String),
          totalCount: expect.any(Number),
        }),
      );

      expect(new Date(record.createdAt).getTime()).toBeGreaterThanOrEqual(
        new Date(payload.startDate).getTime(),
      );
      expect(new Date(record.createdAt).getTime()).toBeLessThanOrEqual(
        new Date(payload.endDate).getTime(),
      );
      expect(record.totalCount).toBeGreaterThanOrEqual(payload.minCount);
      expect(record.totalCount).toBeLessThanOrEqual(payload.maxCount);
    });
  });
});
