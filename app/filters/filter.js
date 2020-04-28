'use strict';

// angular.module('myApp.view2', ['ngRoute'])

angular.module('myApp')
.filter("removeHtml", function() {
    return function(texto) {
        //return String(texto).toUpperCase();
        let data = String(texto).replace(/(<([^>]+)>)/ig, '');
        return data.replace(/&nbsp;/g,'');        
    }
})
.filter("formatDate", function() {
    return function(data) {       
        return moment(data).format('LLL');        
    }
});