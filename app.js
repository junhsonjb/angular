(function() {
  var app = angular.module('myApp', []);

  app.controller('FormController', function() {

    //as a convention, try to always make your 'this' variable
    //the same name as the alias in the ng-controller directive
    var formCtrl = this;

    formCtrl.entries = [
      "hey",
      "now"
    ];

    //This function should "post" the entry that the user writes
    formCtrl.addEntry = function() {

      formCtrl.entries.push(formCtrl.text);
      //clear out the form after submission
      formCtrl.text = "";

    };


  });


}) ();
