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


//soon to be put in the database
// var possibleIntros = [
//   "We're better than Twitter",
//   "You look beautiful",
//   "I love you",
//   "It seems like Blessings keep falling in my lap",
//   "You Tried it.",
//   "Welcome"
// ];

app.get('/intros', function(req, res, next) {

  db.collection('intros', function (err, introsColl) {

    introsColl.find().toArray(function (err, intros) {
      return res.json(intros);
    })

  });

});

//the 'fetching' route for twirts
app.get('/twirts', function(req, res, next) {

  //pcik the collection to use
  db.collection('twirts', function (err, twirtsColl) {
    //finding all the twirts in its collection and putting it an array
    twirtsColl.find().toArray(function (err, twirts) {
      //console.log(twirts); //useful for testing
      //returning that array
      return res.json(twirts);
    });
  });
});

//the 'sending' twirts route -- where the code for posting twirts will take place
app.post('/twirts', function(req, res, next) {
  //twirts.unshift(req.body.newTwirt);//this way the tweets look more like a timeline //no longer used

  //connect to the twirts collection (twirtsColl --> 'twirts Collection')
  db.collection('twirts', function(err, twirtsColl) {
    //the json data to add to the collection, just putting it in a variable
    var newTwirt = { text: req.body.newTwirt };

    //actually putting newTwirt into the collectoin
    twirtsColl.insert(newTwirt, {w:1}, function(err) {
      return res.send();
    });

  });

});

app.listen(3000, function () {
  console.log("Hey Hi Hello!")
});
