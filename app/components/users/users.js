'use strict';

// angular.module('myApp.view2', ['ngRoute'])

angular.module("myApp").controller('ctrlUser', function (Utils, $rootScope, $scope) {
  
  $scope.Utils = Utils
  $scope.Register = Utils.register
  $scope.getData = Utils.getData
  console.log("DA",$scope.getData)
    
  
});