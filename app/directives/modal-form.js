angular.module("myApp").directive('modalForm', ['$rootScope', '$mdDialog', function($rootScope, $mdDialog){
    
    return{
      restrict: 'E',
      scope: {
        button: '@',
        title: '@',
        type: '@',
        action: '@',
      },
      template: `<md-button ng-click="openModal()" >{{button}}</md-button>`,
      link: function (scope, element, attrs, model) {
        
        scope.openModal = function(){
          $mdDialog.show({
            scope: scope,
            templateUrl: `./components/modalForm/${scope.type}-form.html`,
            clickOutsideToClose: true,
            //parent: angular.element(document.body),
          }).then(function(result) {
            
            //result contains username and password
          }, function(){
            //modal exited/cancelled
          });
        }
        scope.closeModal = function(){
            $mdDialog.hide()


            
        }
       
      }
    };
  }]);