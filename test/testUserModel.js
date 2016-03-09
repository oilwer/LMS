'use strict';


// import the moongoose helper utilities
var utils = require('../test/utils');
var should = require('should');

// import our User mongoose model
var User = require('../app/models/user.js');

var testUser1 = new Object({ 
    profilePic: "testPic",
    email: "testEmail",
    first_name: "fname",
    last_name: "lname",
    description: "description",
    personality: "personality",
    phone_number: "phoneNum",
    password: "password",
    courses: {
      course_name: "courseTest"
      },
    role: "testRole" //student/admin/teacher
});
var testUser2 = new Object({ 
    profilePic: "testPic2",
    email: "testEmail2",
    first_name: "fname2",
    last_name: "lname2",
    description: "description2",
    personality: "personality2",
    phone_number: "phoneNum2",
    password: "password2",
    courses: {
      course_name: "courseTest2"
      },
    role: "testRole2" //student/admin/teacher
});

describe('Users: models', function () {

  describe('#login()', function () {
    it('should return true on successfull login', function (done) {
      User.register(testUser1, function (err, createdUser) {
        User.login(createdUser.email, createdUser.password, function (err, res) {
          res.should.equal(true);
          done();
        });
      });
    });

    it('should return false on unsuccessfull login', function (done) {
      User.register(testUser1, function (err, createdUser) {
        User.login(createdUser.email, (createdUser.password + "test"), function (err, res) {
          res.should.equal(false);
          done();
        });
      });
    });

  });

  describe('#register()', function () {
    it('should register a new User', function (done) {

      User.register(testUser1, function (err, createdUser) {
        // Confirm that that an error does not exist
        should.not.exist(err);
        // verify that the returned user is what we expect
        createdUser.email.should.equal("testEmail");
        createdUser.first_name.should.equal("fname");
        createdUser.last_name.should.equal("lname");
        createdUser.description.should.equal("description");
        createdUser.personality.should.equal("personality");
        createdUser.phone_number.should.equal("phoneNum");
        createdUser.password.should.equal("password");
        createdUser.role.should.equal("testRole");
        // Call done to tell mocha that we are done with this test
        done();
      });
    });
  });

  describe('#getAllUsers', function () {
    it('should return all users in DB', function (done) {
      User.register(testUser1, function (err, createdUser) {
        User.register(testUser2, function (err, createdUser) {
          User.getAllUsers(function (err, fetchedUsers) {
           should.not.exist(err);
           fetchedUsers.should.be.instanceof(Array).and.have.lengthOf(2);
           done();
          });
        }); 
      });
    });

    it('should return false if no registered users', function (done) {
      User.getAllUsers(function (err, fetchedUsers) {
        fetchedUsers.should.be.instanceof(Array).and.have.lengthOf(0);
        done();
      })
    });
  });

  describe('#getById()', function () {
    it('should return the user with specified ID', function (done) {
      User.register(testUser1, function (err, fetchedUser) {
        User.getById(fetchedUser._id, function(err, fetchedUser) {
          fetchedUser.email.should.equal("testEmail");
          done();
        });
      });
    });

    it('should return false if no users', function (done) {
      User.getById(null , function (err, fetchedUser) {
        fetchedUser.should.equal(false);
        done();
      });
    });
  });

  describe('#modify()', function () {
    it('should modify an existing user', function (done) {
      User.register(testUser1, function (err, createdUser) {
        User.getById(createdUser._id, function(err, fetchedUser) {
          fetchedUser.first_name = "newName";
          User.modify(fetchedUser, function(err, modifiedUser) {
            modifiedUser.first_name.should.equal("newName");
            done();
          });
        });
      });
    });
  });
});
