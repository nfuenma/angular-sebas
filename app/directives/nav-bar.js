angular.module("myApp").directive('navBar', function () {
  return {
    restrict: 'E',
    templateUrl: './components/NavBar/nav-bar.html',
    scope: {
      login: '=',
    },
    controller: function ($scope, $localStorage, Utils,) {
      $scope.logout = Utils.logout;
  
    }
  }
});