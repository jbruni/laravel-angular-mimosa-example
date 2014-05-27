/*
 * Dúvidas entry point
 */

require(['main'], function() {

    require([
        'duvidas/duvidas-controller',
        'angular-i18n',
        'angular'
    ],

    function(duvidasController) {

        var duvidasApp = angular.module('duvidasApp', []);

        duvidasApp.controller('duvidasController', duvidasController);

        angular.bootstrap(document.getElementById('ng-app'), ['duvidasApp']);
    });
});
