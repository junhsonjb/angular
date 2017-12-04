//declare the app for which we will make controllers
var app = angular.module('app', ["ngRoute"]);

/*right now this is the only controller,
  eventually I'll divide functionality into
  different controllers, maybe not in this
  project, though. But for now this is the
  that it is.
*/

//using the route provider!
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "home.html",
    controller : "appCtrl"
  })

  .when("/signup", {
    templateUrl : "signup.html",
    controller : "signupCtrl"
  });

});

app.controller("appCtrl", function($scope, $http) {

  //post new twirt from form into list of twirts
  $scope.submitNewTwirt = function() {

    // this if clause stops from posting text-less twirts
    if (!$scope.newTwirt == "") {

      $http.post('/twirts', {newTwirt: $scope.newTwirt}).then(function() {
        getTwirts();
        $scope.newTwirt = ""; //clear the input bar
        console.log("Success! Thank God!");
      });

    }


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

  getTwirts(); //this displays the twirts without having to do anything (run any method) first

});

app.controller("signupCtrl", function($scope, $http) {

  $scope.register = function() {
    if (!($scope.email == "" && $scope.user == "" && $scope.pass == "")) {

      var newUser = {
        email : $scope.email,
        username : $scope.user,
        password : $scope.pass
      };

      $http.post('/users', newUser).then(function() {
        alert("Success");
      });

    }
  }

});
