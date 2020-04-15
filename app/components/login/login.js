'use strict';

// angular.module('myApp.view2', ['ngRoute'])

angular.module("myApp").controller('ctrlLogin', function (Utils, $scope, $mdDialog, $http) {
  
  $scope.Utils = Utils
  $scope.Login = Utils.login



  $scope.showPrompt = function(ev) {
    
        $mdDialog.show({
        controller: DialogController,
        template: '<modalForm description="Description de nestor"/>',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
    })

    function DialogController($scope, $mdDialog) {
    
            $scope.data = "data";
        
    }

  };


});