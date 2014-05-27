
/*** Franquia - Assinantes controller ***/

define(['require', 'es5-shim'], function(require) { return ['$scope', '$modal', 'Assinante', function($scope, $modal, Assinante) {

    $scope.assinantes = Assinante.all();

    $scope.filtro = function(assinante) {
        return (assinante.aguardando == 'S' && $scope.indefinido) || 
               (assinante.aguardando == 'E' && $scope.espera) || 
               (assinante.aguardando == 'N' && $scope.ativado && assinante.configuracao.assinatura_ativa == '1') || 
               (assinante.aguardando == 'N' && $scope.desativado && assinante.configuracao.assinatura_ativa != '1');
    };

    $scope.definirStatus = function(assinante) {

        if (Assinante.salvando) {
            return false;
        }

        $scope.assinante = assinante;
        $modal.open({ templateUrl: require.toUrl('franquia/assinantes/definir-status.html'), scope: $scope })
        .result.then($scope.assinante.alterarStatus);
    };

    Assinante.alterarStatus.error = function(response) {
        $scope.alteracaoErro = '' + (response.error ? response.error.message : '');
        $modal.open({ templateUrl: require.toUrl('franquia/assinantes/definir-status-falhou.html'), scope: $scope });
    };

}]; });
