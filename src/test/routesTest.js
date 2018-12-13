const tape = require("tape");
const supertest = require('supertest');
const qs = require('querystring')

const router = require('../server/router');
const runDbBuild = require("../database/db_build");
const check = require("../queries/checkuser.js");
// const user =[
//   {name: """,
//    email: "",
//  } ];
// Test file
tape("Tape is working", t => {
  t.equals(1, 1, "Testing Work ^_^ ");
  t.end();
});

//Test Status
tape('Check status code is 200', (t) => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err)
      t.equal(res.statusCode,200, 'response should be 200');
      t.deepEqual(res.headers['content-type'], 'text/html' , 'response should be htmlFile');
      t.end();
    });
});
// test Staus 404 status
tape('Check status code is 404', (t) => {
  supertest(router)
    .get('/pageNotFound')
    .expect(404)
    .end((err, res) => {
      t.error(err)
      t.equal(res.statusCode, 404 , 'response should be 404');
      t.end();
    });
});
