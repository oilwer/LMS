'use strict';

var utils = require('../test/utils');
var supertest = require("supertest");
var should = require('should');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8080");

var chai = require('chai');
var expect = chai.expect;

// UNIT test begin

describe("Test Routes: webPage",function(){

  // #1 should return home page

  it("should give string",function(done){
    server
    .get("/api")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
    	res.body.should.equal("Welcome to our api! /login & /profile works");
    });
    done();
  });

  it("should return Home Page",function(done){
    // calling home page api
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect("200") // THis is HTTP response
    done();
  });

  it('should give string on logout', function (done) {
  	server
  	.get("/api/logout")
  	.expect("Content-type",/json/)
  	.expect("200")
  	.end(function(err, res){
  		res.body.should.equal("Logged out.");
  		done();
  	});
  });

  it('should return json response', function (done) {
    server
    .get('api/userlist')
    .expect("Content-type",/json/)
    .expect("200")
    done();
  });

  it('should create a user and delete them', function (done) {
    server
    .post("api/user")
    .expect(200)
    .end(function(err, res) {
      server
      .post('/api/user')
      .send({ first_name : "jim", role : "jim", phone_number: "jim", email : "jim", password : "password" })
      .expect("Content-type",/json/)
      .expect("200")
      .end(function(err,res) {
        expect(res.body.first_name).to.equal("jim")
        done();
      });
    });
  });
});

