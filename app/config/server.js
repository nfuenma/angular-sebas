var env = "devs"
var app = angular.module('myApp');

if(env == "dev"){
    app.constant('API_URL', 'http://localhost:3000');
}else {
    app.constant('API_URL', 'http://nodeapi.developmentpool.co');
}