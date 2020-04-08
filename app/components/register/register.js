'use strict';

// angular.module('myApp.view2', ['ngRoute'])

angular.module('myApp').controller('RegisterCtrl', function($scope, $http, $mdToast, $state) {

  $scope.user = {};

  $scope.doGreeting = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('El usuario de registro!')
        .hideDelay(3000)
        .position('end' )
    );
    $state.go('login')
  }


});