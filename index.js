/*
 * Module dependencies
 */
var express = require('express');
var crypto = require('crypto');

//For gravatar images
//hash md5
var md5sum = crypto.createHash('md5');
var pictureHash = md5sum.update(process.env.EMAIL_ADDRESS).digest('hex');

//creating the app
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index', {
      title: 'Home',
      picHash: pictureHash
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
