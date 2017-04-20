var app = angular.module("friendsApp", ["ngRoute"]);
app.config(function ($routeProvider){
  $routeProvider
  .when("/new", {
    templateUrl: "/partials/new-friend.html",
    controller: "newFriendController"
  })
  .when("/friends/update/:friendId",{
    templateUrl: "/partials/update-friend.html",
    controller: "updateFriendController"
  })
  .when("/index",{
    templateUrl: "/partials/friends-index.html",
    controller: "friendsIndexController"
  })
  .when("/friends/:friendId",{
    templateUrl: "/partials/view-friend.html",
    controller: "viewFriendController"
  })
  .otherwise("/index");
});
app.factory("friendFactory", function($http){
  var factory = {};
  var friends = [];
  factory.addFriend = function (friend, addingFriend){
    $http.post("/api/friends", friend).then(function (response){
      friends.push(response.data.friend);
      addingFriend();
    });
  }
  factory.update = function (editedFriend, callback){
    $http.put("/api/friends/update/" + editedFriend._id, {firstName: editedFriend.firstName, lastName: editedFriend.lastName, birthDay: editedFriend.birthDay}).then(function (returned_data){
      console.log("editedFriend", editedFriend);
      friends = returned_data.data;
      if (typeof(callback) == 'function'){
        callback(friends);
      }
    });
  };
  factory.allFriends = function(receivedFriends){
    $http.get("/api/friends").then(function (response){
      friends = response.data.friends;
      receivedFriends(friends);
    })
  }
  factory.getFriend = function (friendId, receivedFriends){
    $http.get("/api/friends/" + friendId).then(function (response){
      receivedFriends(response.data.friend);

    });
  }
  return factory;
});
app.controller("friendsIndexController", function ($scope, friendFactory){
  friendFactory.allFriends(function (friends){
    $scope.friends = friends;
  });
});
app.controller("newFriendController", function ($scope, friendFactory){
  $scope.addFriend = function(){
    friendFactory.addFriend($scope.friend, function (){
      $scope.friend = {};
    });
  }
});
app.controller("viewFriendController", function($scope, $routeParams, friendFactory){
  friendFactory.getFriend($routeParams.friendId, function (friend){
    $scope.friend = friend;
  });
});
app.controller("updateFriendController",
  [
    '$scope',
    '$routeParams',
    'friendFactory',
    function($scope, $routeParams, friendFactory){
      $scope.currentFriend = {};


// function($scope, $routeParams, friendFactory){
//   console.log("ROUTE PARAMS:", $routeParams);
//
//
//   $scope.currentFriend = {};
//   console.log("currentFriend", currentFriend)

  var findFriend = function(){

    friendFactory.getFriend($routeParams.friendId, function(factoryData){
      $scope.currentFriend = factoryData;

    });
  }

  findFriend();
  $scope.update = function(){
    // console.log("this", this);

    if (!$scope.currentFriend.firstName || !$scope.currentFriend.lastName || !$scope.currentFriend.birthDay){
      return;
    }
    friendFactory.update($scope.currentFriend, function(return_data){
    })
  }
}

]
);
