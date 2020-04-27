angular.module("myApp").controller('Ctrl2', function($scope) {  
  
  $scope.func2 = function() {  
    alert('Ctrl2 and func2')  
    $scope.$emit("MyFunction");  
  }  
  
}); 