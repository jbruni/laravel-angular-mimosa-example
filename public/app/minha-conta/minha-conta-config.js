
/*** "Minha Conta" Application (mcApp) configuration ***/

define(['angular', 'require'], function(angular, req) {

    var routes = [
        ['profile',    'Meus Dados'               ],
        ['historico',  'Histórico'                ],
        ['loja',       'Loja de Conveniência'     ],
        ['assinatura', 'Administre sua Assinatura']
    ];

    return ['$routeProvider', '$controllerProvider', '$httpProvider', 'mcApp',
    function($routeProvider, $controllerProvider, $httpProvider, mcApp) {

        // This function allows lazy loading of controllers through Require.JS
        function resolveController(routeName)
        {
            return {'app': ['$rootScope', '$q', function($rootScope, $q) {

                var defer      = $q.defer(),
                    controller = routeName + 'Controller',
                    script     = 'minha-conta/' + routeName + '/' + routeName + '-controller';

                req([script], function(loaded) {
                    $controllerProvider.register(controller, loaded);
                    defer.resolve(mcApp);
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
                templateUrl: req.toUrl('minha-conta/' + route[0] + '/' + route[0] + '.html'),
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
