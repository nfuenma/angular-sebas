'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial', 
  'ngMessages',
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
  
  var registerState = {
    name: 'register',
    url: '/register',
    controller: 'RegisterCtrl',
    templateUrl: './components/register/register.html',
  }


  $urlRouterProvider.otherwise('/');

  
  $stateProvider.state(homeState);
  $stateProvider.state(loginState);
  $stateProvider.state(registerState);
});
