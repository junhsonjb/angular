var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyparser = require('body-parser');
var app = express();

var db = null;
MongoClient.connect("mongodb://localhost:27017/twirty", function(err, dbconn) {
  if (!err) {
    console.log("We are connected");
    db = dbconn;
  }
});

app.use(bodyparser.json());

app.use(express.static('public'));

// var twirts = [
//   "I like candy",
//   "Actually not that much",
//   "I'm just chillin bro",
//   "Sike Nah, I rarely chill #SteadyWorkin!",
//   "Figured out lists in Github markdown."
// ];
//
// //all this does is put the twirts in a reverse order
// //this makes it look more like a 'twitter' feed,
// //where the older posts are at the bottom
// twirts = twirts.reverse();

var possibleIntros = [
  "We're better than Twitter",
  "You look beautiful",
  "I love you",
  "It seems like Blessings keep falling in my lap",
  "You Tried it.",
  "Welcome"
];

app.get('/possibleIntros', function(req, res, next) {
  res.send(possibleIntros);
});

app.get('/twirts', function(req, res, next) {

  db.collection('twirts', function (err, twirtsColl) {
    twirtsColl.find().toArray(function (err, twirts) {
      //console.log(twirts); //useful for testing
      return res.json(twirts);
    });
  });
});

app.post('/twirts', function(req, res, next) {
  //same as push but puts it in backwards
  //twirts.unshift(req.body.newTwirt);//this way the tweets look more like a timeline //no longer used

  db.collection('twirts', function(err, twirtsColl) {
    var newTwirt = { text: req.body.newTwirt };

    twirtsColl.insert(newTwirt, {w:1}, function(err) {
      return res.send();
    });

  });

});

app.listen(3000, function () {
  console.log("Hey Hi Hello!")
});
