/*
 * Module dependencies
 */
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var path = require('path');
var http = require('http');
var fs = require('fs');
var crypto = require('crypto');
var md5 = require('md5');

//creating the app
var app = express();

//using the modules stylus and nib
function compile(str, path) {
    return stylus(str).set('filename', path).use(nib());
}
//configuring app pointing to the views
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {
        layout: false
    });
    app.use(express.logger('dev'));
    app.use(stylus.middleware({
        src: __dirname + '',
        compile: compile
    }));

    app.use(express.static(__dirname));
    //Parser for POST requests, use req.body
    app.use(express.bodyParser());
});

//For gravatar images
//hash md5
var pictureHash = md5(process.env.EMAIL_ADDRESS);

app.set('port', (process.env.PORT || 5000));

//server responses, aka Routes
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Home',
        picHash: pictureHash
    });
});

app.post('/message', function(req, res, next){
    console.log(req.body);
    res.set({'Content-Type': 'application/json'});
    //the json object turned back into serialized form so have to
    //stringify it again, then send it back
    res.send('messageCB(\''+JSON.stringify(req.body)+'\')');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
