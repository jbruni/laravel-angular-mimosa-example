
/*** Franquia - Contrato controller ***/

define(['require'], function(require) { return ['$scope', '$modal', 'Contrato', function($scope, $modal, Contrato) {

    $scope.opcoes = Contrato.opcoes;

    $scope.contrato = Contrato.atual();

    var unwatch = $scope.$watch('contrato', function(value) {
        if (value && value.id_franquia) {
            $scope.contratoOriginal = angular.copy(value);
            unwatch();
        }
    }, true);

    $scope.mudouConfig = function(campo) {

        if (!$scope.contrato || !$scope.contratoOriginal) {
            return false;
        }

        if (campo) {
            return $scope.contrato[campo] != $scope.contratoOriginal[campo];
        }

        var mudou = false, comparar = [
            'dias_de_entrega', 'horario_inicial_min', 'horario_final_max',
            'entrega_mensal', 'entrega_avulsa', 'pedido_minimo', 'horario_fechamento'
        ];

        angular.forEach(comparar, function(campo) {
            mudou = mudou || $scope.mudouConfig(campo);
        });

        return mudou;
    };

    $scope.desfazAlteracoes = function() {

        var desfaz = [
            'dias_de_entrega', 'horario_inicial_min', 'horario_final_max',
            'entrega_mensal', 'entrega_avulsa', 'pedido_minimo', 'horario_fechamento'
        ];

        angular.forEach(desfaz, function(campo) {
            $scope.contrato[campo] = $scope.contratoOriginal[campo];
        });
    };

    $scope.confirmaAlterarContrato = function() {

        if (Contrato.atualizando) {
            return false;
        }

        $modal.open({ templateUrl: require.toUrl('franquia/contrato/confirma-alterar.html'), scope: $scope })
        .result.then($scope.contrato.alterar);
    };

    Contrato.alterar.success = function(response) {
        $scope.contratoOriginal = angular.copy($scope.contrato);
        $scope.alteracaoMensagem = response.mensagem;
        $modal.open({ templateUrl: require.toUrl('franquia/contrato/alteracao-sucesso.html'), scope: $scope });
    };

    Contrato.alterar.error = function(response) {
        $scope.alteracaoErro = '' + (response.error ? response.error.message : '');
        $modal.open({ templateUrl: require.toUrl('franquia/contrato/alteracao-falhou.html'), scope: $scope });
    };

}]; });
