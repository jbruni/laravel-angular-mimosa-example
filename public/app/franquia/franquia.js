/*
 * "Franquia" entry point
 */

require(['main'], function() {

    require([
        'require',
        'angular',
        'franquia/franquia-config',
        'franquia/franquia-controller',
        'models/Contrato',
        'models/Fatura',
        'models/Assinante',
        'models/Endereco',
        'models/Entrega',
        'franquia/produtos/Produtos',
        'directives/pdm-directives',
        'swami',
        'angular-i18n',
        'angular-route',
        'angular-resource',
        'angular-animate',
        'angular-bootstrap',
        'angular-once',
        'ngUpload'
    ],

    function(require, angular, franquiaConfig, franquiaController, Contrato, Fatura, Assinante, Endereco, Entrega, Produtos) {

        var franquiaApp = angular.module('franquiaApp', ['ngRoute', 'ngResource', 'ngAnimate', 'ngUpload', 'ui.bootstrap', 'once', 'Swami', 'pdmDirectives']);

        franquiaApp.constant('franquiaApp', franquiaApp)

        .config(franquiaConfig)

        .factory('Contrato', Contrato)
        .factory('Fatura', Fatura)
        .factory('Assinante', Assinante)
        .factory('Endereco', Endereco)
        .factory('Entrega', Entrega)
        .factory('Produtos', Produtos)

        .controller('franquiaController', franquiaController);

        // Populate templateCache at production environment
        if (typeof templates != 'undefined') {
            franquiaApp.run(['$templateCache', function($templateCache) {
                angular.forEach(templates, function(template, fileName) {
                    $templateCache.put(require.toUrl(fileName), template);
                });
                templates = null;
            }]);
        }

        angular.bootstrap(document.getElementById('ng-app'), ['franquiaApp']);
    });

});
