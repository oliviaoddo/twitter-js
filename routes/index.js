'use strict'

const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');


module.exports = function (io) {
  router.get('/', (req, res) => {
    let tweets = tweetBank.list();
    res.render('index', {tweets: tweets, showForm: true});
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { tweets: list, showForm: true, username: name } );
  });

  router.get('/tweets/:id', function(req, res) {
    var id = Number(req.params.id);
    var tweet = tweetBank.find( {id: id} );
    res.render( 'index', { tweets: tweet, showForm: false} );
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit('newTweet', { name: name, content: text });
    console.log(req.header('Referer'));
    res.redirect('/');
  });
  return router;
};


