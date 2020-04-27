'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  //'ngRoute',
  'ngMaterial', 
  'ngMessages',
  'ui.router',
  'ui.calendar',
  'LocalStorageModule',
  'angularMoment',
  'ui.tinymce',
  'myApp.version'
]).
config( function($stateProvider, $locationProvider, $urlRouterProvider) {
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
    controller: 'ctrlLogin',
    templateUrl: './components/login/login.html',
  }
  
  var registerState = {
    name: 'register',
    url: '/register',
    controller: 'ctrlRegister',
    templateUrl: './components/register/register.html',
  }

  var userState = {
    name: 'users',
    url: '/users',
    controller: 'ctrlUser',
    templateUrl: './components/users/index.html',
  }

  var calendarState = {
    name: 'calendar',
    url: '/calendar',
    controller: 'ctrlCalendar',
    templateUrl: './components/calendar/calendar.html',
  }


  $urlRouterProvider.otherwise('/');

  
  $stateProvider.state(homeState);
  $stateProvider.state(loginState);
  $stateProvider.state(registerState);
  $stateProvider.state(userState);
  $stateProvider.state(calendarState);
});
