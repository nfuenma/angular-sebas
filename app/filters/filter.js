'use strict';

// angular.module('myApp.view2', ['ngRoute'])

angular.module('myApp').filter("removeHtml", function UtilsFactory() {
    return function(texto) {
        //return String(texto).toUpperCase();
        return String(texto).replace(/<[^>]+>/gm, '')
    }
})