'use strict';


angular.module("myApp").controller('ctrlCalendar', function (
  Utils, 
  $mdDialog, 
  $rootScope, 
  $scope, 
  localStorageService, 
  moment) {
    
  $scope.Save_event = Utils.save_event;
  $scope.getDataEvents = Utils.getDataEvents;
  $scope.logout = Utils.logout;

  Utils.getDataEvents().then(function({events}) {
    console.log("RESP",  events)
    
    events.map(event => {
      $scope.events.push(event)
    })
  });

  $scope.event = {};
  $scope.events = [];

  $scope.eventSources =  [$scope.events];
  



  $scope.showDialog = function () {
    
    var parentEl = angular.element(document.body);
    
    $mdDialog.show({
      parent: parentEl,
      templateUrl:'./components/modalForm/event-form.html',
      clickOutsideToClose: true,
      scope: $scope,
      preserveScope: true,
      //openForm: {height: 800}
    }).then(function(result) {
      //result contains username and password
    }, function(){
      //modal exited/cancelled
    });
  }

  $scope.description = {
    plugins: 'link image code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright ',
    

  };


  $scope.validation = function(){
    let value = false;

    if ($scope.event.title != undefined && $scope.event.room != undefined){
      value = true
    }
    return value
  }

  $scope.saveText = function() {
    $scope.data = $scope.description
  }

   $scope.addEvent = function() {
    $scope.events.push({
      allDay: true,
      id: "12",
      room: "Sala paris",
      start: "2020-04-18T00:00:00.000Z",
      title: "asdasdsad",
      url: "http://google.com/",
    })
   }


  $scope.createEvent = function(event, start){
    $scope.randomNumber = Math.floor(Math.random()*90000) + 10000;;
    
    $scope.saveText()


    $scope.events.push({
      id: $scope.randomNumber,
      title: $scope.event.title,
      start: $scope.event.start,
      end: $scope.event.end,
      room: $scope.event.room,
      description: $scope.event.description,
      allDay: true
    });
  
    $scope.Save_event($scope.event);
    $scope.getDataEvents();

    $mdDialog.hide()
    console.log("eventSources",  $scope.eventSources)
    console.log("eventSources2",  $scope.eventSources2)
  }

  $scope.closeModal = function(){
    $mdDialog.hide()
  }

  $scope.cleanStorage = function(){
    localStorageService.set("start", "")
  }

  $scope.dayClickEvent = function( date, allDay, jsEvent, view ) {
    console.log("DATA", date)
    var d = new Date(date._d);
    $scope.event.start = d.setMinutes( d.getMinutes() + 300 );
    $scope.event.end = d.setMinutes( d.getMinutes() + 330 );


    $scope.event.start_format = moment(d).format('LLL')  
  
    $scope.showDialog()
  }

  $scope.eventClickEvent = function(data) {
    $scope.eventSave = data

    var parentEl = angular.element(document.body);
    
    $mdDialog.show({
      parent: parentEl,
      templateUrl:'./components/calendar/event-show.html',
      clickOutsideToClose: true,
      scope: $scope,
      preserveScope: true,
      //openForm: {height: 800}
    }).then(function(result) {
      //result contains username and password
    }, function(){
    
      //modal exited/cancelled
    });
  }

  $scope.alertOnDrop = function(date, allDay, jsEvent, view ){

  }

  $scope.alertOnResize = function(date, allDay, jsEvent, view ) {

  }
  
  $scope.uiConfig = {
    calendar:{
      height: 450,
      selectable: true,
      selectHelper: true,
      editable: true,
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      header:{
        left: 'month basicWeek basicDay agendaWeek agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
      dayClick: $scope.dayClickEvent,
      eventClick: $scope.eventClickEvent,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize
    }
  };

  

  
});