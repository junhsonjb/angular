var app = angular.module('app', []);

app.controller("appCtrl", function($scope, $http) {

  $scope.submitNewTwirt = function() {
    $http.post('/twirts', {newTwirt: $scope.newTwirt}).then(function() {
      console.log("Success! Thank God!");
    });
  };

  $http.get('/twirts').then(function(response) {
    $scope.twirts = response.data;
  });

});
