angular.module("myApp").directive('modal-form', function () {
    return {
      restrict: 'E',
      templateUrl: './components/register/modal/register-card.html',
      scope: {
        action: '&',
        color: '@',
        description: '@',
        icon: '@',
        title: '@'
      },
      controller: function ($scope) {
        // $scope.color = `dark-${$scope.color}` || 'default';
        
      }
    }
});