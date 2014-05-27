/*
 * Contato entry point
 */

require(['main'], function() {

    require([
        'contato/contato-controller',
        'directives/pdm-directives',
        'angular-i18n',
        'angular'
    ],

    function(contatoController) {

        var contatoApp = angular.module('contatoApp', ['pdmDirectives']);

        contatoApp.controller('contatoController', contatoController);

        angular.bootstrap(document.getElementById('ng-app'), ['contatoApp']);
    });
});
