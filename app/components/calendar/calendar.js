'use strict';

// angular.module('myApp.view2', ['ngRoute'])

angular.module("myApp").controller('ctrlCalendar', function (Utils, $rootScope, $scope) {
  
  $scope.Utils = Utils
  $scope.Register = Utils.register
  $scope.getData = Utils.getData


  $scope.uiConfig = {
    calendar:{
      height: 450,
      editable: true,
      header:{
        left: 'month basicWeek basicDay agendaWeek agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
      eventClick: $scope.alertEventOnClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize
    }
  };
  
  $scope.eventSources = [];
  
});