'use strict';

// angular.module('myApp.view2', ['ngRoute'])

angular.module('myApp').controller('LoginCtrl', function($scope, $http, $mdToast, $state) {

  $scope.user = {};
  
  $scope.login = async () => {
    try {
      await $http({
        method: 'POST',
        url: 'https://invimarefactory.desarrollodeprueba.com/admin/login',
        data: $scope.user
      });
      $mdToast.show(
        $mdToast.simple()
          .textContent('Papi corone!')
          .hideDelay(3000)
          .position('start' )
      );
      $state.go('home')
    } catch (error) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Papi que dijiste corone!')
          .hideDelay(3000)
          .position('start' )
      );
    }

  }
  
});