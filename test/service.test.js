const request = require('supertest');
const service = require('../service');

describe('GET /', function() {
  it('understands a unix timestamp', function(done) {
    request(service)
      .get('/1450137600')
      .expect('Content-Type', /json/)
      .expect(200, {
        unix: 1450137600,
        natural: "December 15, 2015"
      }, done);
  });

  it('understands a natural language date', function(done) {
    request(service)
      .get('/December%2015,%202015')
      .expect('Content-Type', /json/)
      .expect(200, {
        unix: 1450137600,
        natural: "December 15, 2015"
      }, done);
  });

  it('does not understand other values', function(done) {
    request(service)
      .get('/cryptocat')
      .expect('Content-Type', /json/)
      .expect(200, {
        unix: null,
        natural: null
      }, done);
  });

  it('understands a small number', function(done) {
    request(service)
      .get('/123')
      .expect('Content-Type', /json/)
      .expect(200, {
        unix: 123,
        natural: 'January 1, 1970'
      }, done);
  });

  it('understands a large number', function(done) {
    request(service)
      .get('/999999999999')
      .expect('Content-Type', /json/)
      .expect(200, {
        unix: 999999999999,
        natural: 'September 27, 33658'
      }, done);
  });

  it('does not understand overflow (invalid date)', function(done) {
    request(service)
      .get('/999999999999999999999999')
      .expect('Content-Type', /json/)
      .expect(200, {
        unix: null,
        natural: null
      }, done);
  });
});
