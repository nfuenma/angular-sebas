'use strict';


angular.module("myApp").controller('ctrlCalendar', function (Utils, $mdDialog, $rootScope, $scope, localStorageService, moment) {
  $scope.event = {};
  $scope.events = [
  ];

  $scope.eventSources =  [$scope.events];


  $scope.showDialog = function (date_clicked) {
    
    var parentEl = angular.element(document.body);
    localStorageService.set("start", date_clicked)
    console.log("SCOPE", $scope)
    $mdDialog.show({
      parent: parentEl,
      templateUrl:'./components/modalForm/event-form.html',
      clickOutsideToClose: true,
      scope: $scope,
      preserveScope: true,
    }).then(function(result) {
      //result contains username and password
    }, function(){
      console.log("EXITED")
      //modal exited/cancelled
    });
  }

  $scope.tinymceModel = 'Initial content';

  $scope.tinymceOptions = {
    plugins: 'link image code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    
  };


  $scope.saveText = function() {
    $scope.data = $scope.tinymceModel
    console.log("DATA", $scope.data)
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
      start: $scope.event.started,
      room: $scope.event.room,
      url: "http://google.com/",
      allDay: true
    });
  
    console.log("SCOPE", $scope)
    console.log($scope.eventSources)
    $mdDialog.hide()
  }

  $scope.closeModal = function(){
    $mdDialog.hide()
  }

  $scope.cleanStorage = function(){
    localStorageService.set("start", "")
  }

  $scope.dayClickEvent = function( date, allDay, jsEvent, view ) {
    
    var d = new Date(date._d);
    $scope.event.started = d.setMinutes( d.getMinutes() + 300 );
    $scope.event.start = moment(d).format('LLL')
    console.log("dateClicked", date._d)   
  
    $scope.showDialog()
  }

  $scope.alertOnDrop = function(date, allDay, jsEvent, view ){
    console.log("SE MOVIO EL EVENTO date", date)
    console.log("SE MOVIO EL EVENTO allDay", allDay)
    console.log("SE MOVIO EL EVENTO jsEvent", jsEvent)
    console.log("SE MOVIO EL EVENTO view", view)
  }

  $scope.alertOnResize = function(date, allDay, jsEvent, view ) {
    console.log("SE RESICE EL EVENTO", date)
    console.log("SE RESICE EL EVENTO", allDay)
    console.log("SE RESICE EL EVENTO", jsEvent)
    console.log("SE RESICE EL EVENTO", view)
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