'use strict';

// angular.module('myApp.view2', ['ngRoute'])

angular.module('myApp').factory('Utils', [
    '$rootScope',
    '$window',
    '$state',
    '$mdToast',
    '$mdDialog',
    function UtilsFactory(
      $rootScope,
      $window,
      $state,
      $mdToast,
      $mdDialog 
    ) {

        var data_form;


      return {
        login: function () {
            $mdToast.show(
                $mdToast.simple()
                .textContent('Inicio de sesion correcto!')
                .hideDelay(3000)
                .position('end' )
            );
            $state.go('home')              
        },
        register: function (project) {
            $mdDialog.hide()
            $mdToast.show(
                $mdToast.simple()
                .textContent('Se registro correctamente!')
                .hideDelay(3000)
                .position('end' )
            );
            data_form = project
            $state.go('users')
        },
        getData: function(){
            return data_form;
        },






    }
}
])