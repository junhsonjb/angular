var app = angular.module('app', []);

app.controller("appCtrl", function($scope, $http) {

  //post new twirt from form into list of twirts
  $scope.submitNewTwirt = function() {
    $http.post('/twirts', {newTwirt: $scope.newTwirt}).then(function() {
      getTwirts();
      $scope.newTwirt = ""; //clear the input bar
      console.log("Success! Thank God!");
    });
  };

  $scope.removeTwirt = function(itemToRemove) {
    $http.put('/twirts/remove', {item/*<-- I think the issue is here*/: itemToRemove}).then(function() {
      getTwirts();
    });
  };


  $http.get('/intros').then(function(response) {
    $scope.titles = response.data;

    $scope.introMessage = $scope.titles[Math.floor(Math.random() * $scope.titles.length)];

  });

  //function to get Twirts (hence the name)
  function getTwirts() {

    //use http dependency to go to the twirts route and...
    $http.get('/twirts').then(function(response) {

      //...save the server result (an array) to this variable down here
      $scope.twirts = response.data;

    });

  }

  getTwirts();

});
