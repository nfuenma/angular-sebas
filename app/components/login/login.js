'use strict';

// angular.module('myApp.view2', ['ngRoute'])

angular.module('myApp').controller('LoginCtrl', function($scope, $http, $mdToast, $state) {

  $scope.doGreeting = function(greeting) {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Inicio sesion de manera correcta!')
        .hideDelay(3000)
        .position('end' )
    );
    $state.go('home')
  }


});