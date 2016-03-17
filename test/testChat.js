//testChat.js

'use strict';

// import the moongoose helper utilities
var utils = require('../test/utils');
var should = require('should');
// import our User mongoose model
var Chat = require('../app/models/chat.js');





describe('Chat Test', function (){

var message = new Object();
    message.username = "J";
    message.channel = "#webhooksapi";
    message.text1 = "A";
    message.text2 = "test chat data x";

var channelID = "C0RRZEDK4";

  describe('#sendMessage()', function (){
    it('should return A on success', function (done){
      Chat.send(message.username, message.text1, function (err, msgData){
          msgData.message.text.should.equal("A");
          done();
      });
    });
  });

  describe('#getMessage()', function(){
      it('should return 123 on success', function(done){
          Chat.getMessage(channelID, function (err, msgData){
              msgData.ok.should.equal(true);
              done();
          });
      });
  });

  describe('#getChannelList()', function(){
        it('should do nothing for now', function(done){
            Chat.getChannelList(function (err, msgData){
                done();
            });
        });
    });

  describe('#getLatestMessage()', function(){
        it('should return inputted data', function(done){
            Chat.send(message.username, message.text2, function (err, msgData){
            console.log("getLatestMessage step 1: ");
            console.log(msgData);
            });
            Chat.getLatestMessage(channelID, function (err, msgData){
            console.log("getLatestMessage step 2: ");
            console.log(msgData);
                msgData.messages[0].text.should.equal("test chat data x");
                done();
            });
        });
    });


});