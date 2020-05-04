var request = require('supertest');
require = require('really-need');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('./server', { bustCache: true });
  });
  afterEach(function (done) {
    server.close(done);
  });
  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('test rovers - 1', function testPath(done) {
    let input = '5 5\n\
                 1 2 N \n\
                 LMLMLMLMM' 
    console.log('test rovers using input:')
    request(server)
      .post('/api/rovers_position')
      .expect(200, done);
  });
});

/*
Several Rovers Testing
5 5
1 2 N 
LMLMLMLMM 
5 5 N 
LMLMLMLMM 
1 2 N 
LMGMLMM 
a 2 N 
LMGMLMM 
4 7 S 
LMLMLMLMM 
4 3 F 
LMLMLMLMM 
3 3 E  
MMRMMRMRRM
*/