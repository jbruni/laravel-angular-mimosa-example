
/*** "Franquia" Application (franquiaApp) configuration ***/

define(['angular', 'require'], function(angular, req) {

    var routes = [
        ['contrato',   'Configurações da Franquia'],
        ['financeiro', 'Financeiro'               ],
        ['produtos',   'Produtos e Categorias'    ],
        ['assinantes', 'Assinantes'               ],
        ['entrega',    'Lista de Entrega'         ]
    ];

    return ['$routeProvider', '$controllerProvider', '$httpProvider', 'franquiaApp',
    function($routeProvider, $controllerProvider, $httpProvider, franquiaApp) {

        // This function allows lazy loading of controllers through Require.JS
        function resolveController(routeName)
        {
            return {'app': ['$rootScope', '$q', function($rootScope, $q) {

                var defer      = $q.defer(),
                    controller = routeName + 'Controller',
                    script     = 'franquia/' + routeName + '/' + routeName + '-controller';

                req([script], function(loaded) {
                    $controllerProvider.register(controller, loaded);
                    defer.resolve(franquiaApp);
                    $rootScope.$apply();
                });

                return defer.promise;
            }]};
        }

        // Route mapping builder
        function getRouteMapping(route) {
            var mapping = {
                name:        route[0],
                header:      route[1],
                templateUrl: req.toUrl('franquia/' + route[0] + '/' + route[0] + '.html'),
                controller:  route[0] + 'Controller',
                resolve:     resolveController(route[0])
            };
            return mapping;
        }

        var path, mapping;

        // Configure all routes
        angular.forEach(routes, function(route) {
            path = '/' + route[0];
            mapping = getRouteMapping(route);
            $routeProvider.when(path, mapping);
        });

        $routeProvider.otherwise({ redirectTo: '/' + routes[0][0] });

        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    }];

});
