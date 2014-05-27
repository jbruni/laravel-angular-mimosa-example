/*
 * Assine entry point
 */

require(['main'], function() {

    require([
        'assine/assine-controller',
        'assine/cadastre-controller',
        'models/Franquia',
        'models/Assinatura',
        'models/Produto',
        'models/Assinante',
        'models/Endereco',
        'directives/pdm-directives',
        'swami',
        'angular',
        'angular-i18n',
        'angular-bootstrap'
    ],

    function(assineController, cadastreController, Franquia, Assinatura, Produto, Assinante, Endereco) {

        var assineApp = angular.module('assineApp', ['pdmDirectives', 'Swami', 'ui.bootstrap'])

        .controller('assineController', assineController)
        .controller('cadastreController', cadastreController)

        .factory('Franquia', Franquia)
        .factory('Assinatura', Assinatura)
        .factory('Produto', Produto)
        .factory('Assinante', Assinante)
        .factory('Endereco', Endereco);

        angular.bootstrap(document.getElementById('ng-app'), ['assineApp']);
    });
});
