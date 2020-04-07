'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  //'myApp.view1',
  //'myApp.view2',
  'ui.router',
  'myApp.version'
]).
config( function($stateProvider, $locationProvider, $routeProvider, $urlRouterProvider) {
  $locationProvider.hashPrefix('!');

  //$routeProvider.otherwise({redirectTo: '/view1'});
  

  var homeState = {
    name: 'home',
    url: '/',
    //controller: 'LoginCtrl',
    templateUrl: './components/home/home.html',
  }

  var loginState = {
    name: 'login',
    url: '/login',
    controller: 'LoginCtrl',
    templateUrl: './components/login/login.html',
  }


  $urlRouterProvider.otherwise('/');

  
  $stateProvider.state(homeState);
  $stateProvider.state(loginState);
});
