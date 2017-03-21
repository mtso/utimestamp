const request = require('supertest');

describe('GET /', function() {
  it('understands a unix timestamp', function(done) {
    request
      .get('/1450137600')
      .expect()
      .expect('Content-Type', /json/)
      .expect(200, {
        unix: 1450137600,
        natural: "December 15, 2015"
      }, done);
  });

  it('understands a natural language date', function(done) {
    done(new Error('not implemented'));
  });

  it('does not understand other values', function(done) {
    done(new Error('not implemented'));
  });
});