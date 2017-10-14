var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/twirts', function(req, res, next) {
  var twirts = [
    "I like candy",
    "Actually not that much",
    "I'm just chillin bro",
    "Sike Nah, I rarely chill #SteadyWorkin!"
  ];

  //all this does is put the twirts in a reverse order
  //this makes it look more like a 'twitter' feed,
  //where the older posts are at the bottom
  twirts = twirts.reverse();

  res.send(twirts);
});

app.listen(3000, function () {
  console.log("Hey Hi Hello!")
});
