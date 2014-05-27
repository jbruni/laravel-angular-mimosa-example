
/*** "Franquia" Application (franquiaApp) controller ***/

define(['require', 'es5-shim'], function(require) { return ['$scope', function($scope) {

    $scope.$on('$routeChangeSuccess', function(event, current, previous) {
        $scope.route = current.$$route;
    });

    $scope.asset = require.toUrl;

    $scope.keys = Object.keys;

    $scope.values = function (object) {
        var index = -1,
            props = Object.keys(object),
            length = props.length,
            result = Array(length);

        while (++index < length) {
          result[index] = object[props[index]];
        }
        return result;
    };

}]; });
