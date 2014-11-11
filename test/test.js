'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var bodyparser = require('body-parser');
var jsonParser = bodyparser.json();
var fs = require('fs');

var expect = chai.expect;


describe('post and get to/from harddisk', function() {
  it('should be able post JSON to file', function(done) {
    chai.request('http://localhost:3000')
    .post('/json/test', function(req, res) {
      console.log('hullo');
      var name = req.params.name;
      var obj = JSON.stringify({someName: name});
      fs.writeFile('db/tesdb/test.json', obj, function() {
        expect(obj).to.eql('{"someName": "test"}');
      });
    });
    done();
  });

  it('should be able to read from .json file', function(done) {
    chai.request('http://localhost3000')
    .get('/json/test', jsonParser, function(req, res) {
      fs.readFile('db/testdb/test.json', function() {
        expect(res).to.have.property('someName');
        expect(res.name).to.be('hullo');
      });
    });
    done();
  });
});
