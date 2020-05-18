'use strict';

// angular.module('myApp.view2', ['ngRoute'])

angular.module('myApp').factory('Utils', [
    '$rootScope',
    '$window',
    '$state',
    '$mdToast',
    '$mdDialog',
    '$http',
    '$localStorage',
    '$cookies',
    'API_URL',

    function UtilsFactory(
      $rootScope,
      $window,
      $state,
      $mdToast,
      $mdDialog,
      $http,
      $localStorage,
      $cookies,
      API_URL,
    ) {



      var data_form;
      var all, odds = [];

      return {
        login: function (user) {
          console.log(user)
          $http({
            method: 'POST',
            url: `${API_URL}/users/login`,
            data: user,
          }).then(function successCallback(response) {
              console.log("RES", response)

              var data = response.data;
              const expireTime = new Date();     
              expireTime.setSeconds(expireTime.getSeconds()+data.time)
              
              if(data.message == "Logged In Successfully"){
                $cookies.put('__qwerty__', `${data.token}`,{'expires': expireTime}); //= `__qwerty__=${data.token};expires=${expireTime}`;
                console.log("COKIES", $cookies.get('__qwerty__'))
                $localStorage.token = data.token;
              }else{
                console.log("COKIES", $cookies.get('__qwerty__'))
                $localStorage.token = null;
              }              
              $state.go('calendar',{},{reload:true})
              $mdToast.show(
                $mdToast.simple()
                .textContent(data.message)
                .hideDelay(3000)
                .position('end')
              );
              
            }, function errorCallback({data}) {
                $mdToast.show(
                  $mdToast.simple()
                  .textContent(data.message)
                  .hideDelay(3000)
                  .position('end' )
                );
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });           
        },
        
        isAuth: function() {
          try {
              return $localStorage.token != null;
          } catch (err) {
              console.log("ERRR", err)
              return false;
          }
        },

        logout: function () {
          $cookies.remove('__qwerty__')
          $localStorage.token = null;
          $state.go('login','home',{reload:true})
        },

        register: function (project) {
            console.log(typeof( project))
            $http({
                method: 'POST',
                url: `${API_URL}/users/register`,
                headers:{
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
                data: project
              }).then(function successCallback({data}) {
                let message_show;
                if(data.errors)  {
                  message_show = data.errors[0].text
                }else{
                  console.log("DATA FIRST", data)
                  message_show = data.message
                  $mdDialog.hide()
                  $state.go('users')
                }
                  
                  $mdToast.show(
                      $mdToast.simple()
                      .textContent(message_show)
                      .hideDelay(3000)
                      .position('end' )
                  );
                }, function errorCallback(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                });

            data_form = project
            console.log("DATA", data_form)
            
        },

        save_event: function (event) {
            
            $http({
                method: 'POST',
                url: `${API_URL}/event/add?token=${$localStorage.token}`,
                headers:{
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
                data: event,
              }).then(function successCallback({data}) {  
                        
                  var message_show;
                  if(data.errors){
                    message_show = data.errors[0].message;
                  } else{
                    message_show = data.message;
                  }
                  
                  $mdToast.show(
                    $mdToast.simple()
                    .textContent(message_show)
                    .hideDelay(3000)
                    .position('end' )
                  );
                }, function errorCallback(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                });
            $mdDialog.hide()
        },

        getData: function(){
            return data_form;
        },
        
        getDataEvents: function() {
          var oPromise = $http({
            method: 'GET',
            url: `${API_URL}/events?token=${$localStorage.token}`,
            headers:{
              'Content-Type': 'application/json',
              
            },
            withCredentials: true,
            /* mode: 'same-origin',     
            redirect: 'follow',     
            credentials: 'include', */
          }).then(function (response) {
            console.log("DATA NEStor", response)
            return response.data;
          });
          return oPromise;
        },

        getLoginStatus: function(){
          return status_login;
        },
    }
}
])