var express = require('express');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());

app.use(express.static('public'));

var twirts = [
  "I like candy",
  "Actually not that much",
  "I'm just chillin bro",
  "Sike Nah, I rarely chill #SteadyWorkin!",
  "Figured out lists in Github markdown."
];

//all this does is put the twirts in a reverse order
//this makes it look more like a 'twitter' feed,
//where the older posts are at the bottom
twirts = twirts.reverse();

app.get('/twirts', function(req, res, next) {



  res.send(twirts);
});

app.post('/twirts', function(req, res, next) {
  twirts.unshift(req.body.newTwirt);
  res.send();
});

app.listen(3000, function () {
  console.log("Hey Hi Hello!")
});
