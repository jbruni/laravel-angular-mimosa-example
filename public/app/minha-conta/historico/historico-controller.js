
/*** Histórico controller ***/

define([], function() { return ['$scope', 'Swami', function($scope, Swami) {

	$scope.historico = Swami('faturas').all(true);

}]; });
