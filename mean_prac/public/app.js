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


  $http.get('/intros').then(function(response) {
    $scope.titles = response.data;

    $scope.introMessage = $scope.titles[Math.floor(Math.random() * $scope.titles.length)];

  });

  function getTwirts() {

    $http.get('/twirts').then(function(response) {

      $scope.twirts = response.data;

    });

  }

  getTwirts();

});
