angular.module("myApp").controller('Ctrl1', function($scope,$rootScope) {  
  
    $scope.func1 = function() {  
      alert('Ctrl1 and func1')  
    }  
    
      $rootScope.$on("MyFunction", function () {  
          alert('Ctrl1 MyFunction')  
      });  
  });  