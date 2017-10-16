var app = angular.module('app', []);

app.controller("appCtrl", function($scope, $http) {

  $scope.submitNewTwirt = function() {
    $http.post('/twirts', {newTwirt: $scope.newTwirt}).then(function() {
      console.log("Success! Thank God!");
    });
  };


  $http.get('/possibleIntros').then(function(response) {
    $scope.titles = response.data;

    $scope.introMessage = $scope.titles[Math.floor(Math.random() * $scope.titles.length)];

  });



  $http.get('/twirts').then(function(response) {
    $scope.twirts = response.data;

  });

});
