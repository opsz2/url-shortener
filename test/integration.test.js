const request = require('supertest');
const app = require('../src');
const { Url } = require('../src/models');
const httpStatus = require('http-status');
const { mongoose } = require('../src/config/mongoose');

describe('URL Shortener API', () => {
  let dbUrls;

  beforeEach(async () => {
    dbUrls = {
      testRoute1: {
        originalUrl: 'https://test-route.herokuapp.com/',
        shortUrl: 'http://localhost:8080/myRMb0',
        urlCode: 'myRMb0',
      },
      testRoute2: {
        originalUrl: 'https://test-route-2.herokuapp.com/',
        shortUrl: 'http://localhost:8080/myABC0',
        urlCode: 'myABC0',
      },
    };

    await Url.deleteMany({});
    await Url.insertMany([dbUrls.testRoute1, dbUrls.testRoute2]);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe('POST /v1', () => {
    it('should create a new short url when request is ok', async () => {
      const res = await request(app)
        .post('/v1')
        .send({ originalUrl: 'https://test-route-3.herokuapp.com/' });

      expect(res.status).toEqual(httpStatus.OK);
      expect(res.body).toHaveProperty('data');
    });

    it('should return the same short url when originalUrl already exist', async () => {
      const res = await request(app)
        .post('/v1')
        .send({ originalUrl: 'https://test-route-2.herokuapp.com/' });
      expect(res.status).toEqual(httpStatus.OK);
      expect(res.body).toHaveProperty('data', 'http://localhost:8080/myABC0');
    });

    it('should throw an error if originalUrl is invalid', async () => {
      const res = await request(app)
        .post('/v1')
        .send({ originalUrl: 'https//test-route-2.herokuapp.com/' });
      expect(res.status).toEqual(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /v1/:urlCode', () => {
    it('should throw an error when short urlCode is invalid', async () => {
      const res = await request(app).get('/v1/123');
      expect(res.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should redirect to OriginalUrl when short urlCode is valid', async () => {
      const res = await request(app).get('/v1/myABC0');
      expect(res.status).toEqual(httpStatus.FOUND);
    });
  });
});
