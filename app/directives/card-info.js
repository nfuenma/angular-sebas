angular.module("myApp").directive('cardInfo', function () {
    return {
      restrict: 'E',
      templateUrl: './components/card/card-info.html',
      scope: {
        action: '&',
        user: '=',
        color: '@',
        description: '@',
        icon: '@',
        title: '@',
        data: '@',
      },
      controller: function ($scope) {
        
        // $scope.color = `dark-${$scope.color}` || 'default';
        
      }
    }
  });