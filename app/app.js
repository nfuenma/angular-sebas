'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  //'ngRoute',
  'ngMaterial', 
  'ngMessages',
  'ngStorage',
  'ngCookies',
  'ui.router',
  'ui.calendar',
  'LocalStorageModule',
  'angularMoment',
  'ui.tinymce',
  'mgo-angular-wizard',
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
    resolve: {
      status_login: () => {
        console.log("LOGIN")
        
      }
    },
    templateUrl: './components/calendar/calendar.html',
  }

 
  $stateProvider.state(homeState);
  $stateProvider.state(loginState);
  $stateProvider.state(registerState);
  $stateProvider.state(userState);
  $stateProvider.state(calendarState);
}).controller('app', function (Utils, $rootScope, $scope, $localStorage, $cookies, $state) {
  $scope.status_login = $localStorage.status_login
  $scope.isAuth = Utils.isAuth;

  if($cookies.get('__qwerty__') != null){
    console.log("GOOOO")
    $state.go('calendar');
  }else{
    console.log("GEEEE")
    $state.go('login');
  }
});
