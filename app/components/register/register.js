'use strict';

// angular.module('myApp.view2', ['ngRoute'])

angular.module("myApp").controller('ctrlRegister', function (Utils, $scope) {
  
  $scope.Utils = Utils
  $scope.Register = Utils.register

});