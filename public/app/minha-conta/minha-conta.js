/*
 * "Minha Conta" entry point
 */

require(['main'], function() {

    require([
        'require',
        'angular',
        'minha-conta/minha-conta-config',
        'minha-conta/minha-conta-controller',
        'models/Assinante',
        'models/Assinatura',
        'models/Endereco',
        'models/Franquia',
        'models/Produto',
        'directives/pdm-directives',
        'swami',
        'angular-i18n',
        'angular-route',
        'angular-animate',
        'angular-bootstrap',
        'angular-once'
    ],

    function(require, angular, mcConfig, mcController, Assinante, Assinatura, Endereco, Franquia, Produto) {

        var mcApp = angular.module('mcApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'once', 'Swami', 'pdmDirectives']);

        mcApp.constant('mcApp', mcApp)

        .config(mcConfig)

        .factory('Assinante', Assinante)
        .factory('Assinatura', Assinatura)
        .factory('Endereco', Endereco)
        .factory('Franquia', Franquia)
        .factory('Produto', Produto)

        .controller('mcController', mcController);

        // Populate templateCache at production environment
        if (typeof templates != 'undefined') {
            mcApp.run(['$templateCache', function($templateCache) {
                angular.forEach(templates, function(template, fileName) {
                    $templateCache.put(require.toUrl(fileName), template);
                });
                templates = null;
            }]);
        }

        angular.bootstrap(document.getElementById('ng-app'), ['mcApp']);
    });

});
