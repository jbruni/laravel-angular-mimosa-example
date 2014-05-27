
/*** Assinatura controller ***/

define(['require'], function(require) { 
return ['$scope', '$modal', 'Assinatura', 'Franquia', 
function($scope, $modal, Assinatura, Franquia) {

    $scope.assinatura = Assinatura.atual();

    $scope.franquia = Franquia.atual();

    /*
     * A "acao" pode ser: "ativar", "desativar", "pausar" ou "despausar"
     */
    $scope.confirmaAtualizarAssinatura = function(acao) {

        if (Assinatura.atualizando) {
            return false;
        }

        $modal.open({ templateUrl: require.toUrl('minha-conta/assinatura/confirma-' + acao + '.html'), scope: $scope })
        .result.then($scope.assinatura[acao]);
    };

    /*
     * Ativação / Desativação de Assinatura
     */
    Assinatura.ativar.success = function() {
        $scope.assinatura.assinatura_ativa = '1';
        $modal.open({ templateUrl: require.toUrl('minha-conta/assinatura/ativacao-sucesso.html') });
    };

    Assinatura.ativar.error = function(response) {
        $scope.ativacaoErro = '' + (response.error ? response.error.message : '');
        $modal.open({ templateUrl: require.toUrl('minha-conta/assinatura/ativacao-falhou.html'), scope: $scope });
    };

    Assinatura.desativar.success = function(response) {
        $scope.assinatura.assinatura_ativa = '0';
        $scope.gerouFatura = response.fatura;
        $scope.desativacaoMensagem = response.mensagem;
        $modal.open({ templateUrl: require.toUrl('minha-conta/assinatura/desativacao-sucesso.html'), scope: $scope });
    };

    Assinatura.desativar.error = function(response) {
        $scope.desativacaoErro = '' + (response.error ? response.error.message : '');
        $modal.open({ templateUrl: require.toUrl('minha-conta/assinatura/desativacao-falhou.html'), scope: $scope });
    };

    /*
     * Ativação / Desativação de Pausa
     */
    $scope.$watch('assinatura.data_pausado_ate', function() {
        // Fechar calendário se estiver visível
        if ($('#popover-calendario-pausa').is(':visible')) {
            setTimeout(function() { $('#trigger-calendario-pausa').click(); });
        }
    });

    Assinatura.pausar.success = function(response) {
        $scope.assinatura.pausado = '1';
        $scope.pausamentoMensagem = response.mensagem;
        $modal.open({ templateUrl: require.toUrl('minha-conta/assinatura/pausa-sucesso.html'), scope: $scope });
    };

    Assinatura.pausar.error = function(response) {
        $scope.pausaErro = '' + (response.error ? response.error.message : '');
        $modal.open({ templateUrl: require.toUrl('minha-conta/assinatura/pausa-falhou.html'), scope: $scope });
    };

    Assinatura.despausar.success = function(response) {
        $scope.assinatura.pausado = '0';
        $scope.assinatura.data_pausado_ate = null;
        $scope.despausamentoMensagem = response.mensagem;
        $modal.open({ templateUrl: require.toUrl('minha-conta/assinatura/despausa-sucesso.html'), scope: $scope });
    };

    Assinatura.despausar.error = function(response) {
        $scope.despausaErro = '' + (response.error ? response.error.message : '');
        $modal.open({ templateUrl: require.toUrl('minha-conta/assinatura/despausa-falhou.html'), scope: $scope });
    };

    /*
     * Configurações da Assinatura
     */
    var unwatch = $scope.$watch('assinatura', function(value) {
        if (value && value.id_franquia) {
            $scope.assinaturaOriginal = angular.copy(value);
            unwatch();
        }
    }, true);

    $scope.$watch('assinatura', $scope.assinatura.atualizaValor, true);

    $scope.mudouConfig = function(campo) {

        if (!$scope.assinatura || !$scope.assinaturaOriginal) {
            return false;
        }

        if (campo == 'quantidades') {
            return angular.toJson($scope.assinatura[campo]) != angular.toJson($scope.assinaturaOriginal[campo]);
        }

        if (campo) {
            return $scope.assinatura[campo] != $scope.assinaturaOriginal[campo];
        }

        var mudou = false, comparar = ['horario_inicial', 'horario_final', 'dias_de_entrega', 'quantidades'];

        angular.forEach(comparar, function(campo) {
            mudou = mudou || $scope.mudouConfig(campo);
        });

        return mudou;
    };

    $scope.mudouQuantidadeItem = function(id_produto) {

        if (!$scope.assinatura || !$scope.assinaturaOriginal) {
            return false;
        }

        return $scope.assinatura.quantidades[id_produto] != $scope.assinaturaOriginal.quantidades[id_produto];
    };

    $scope.desfazAlteracoes = function() {

        var desfaz = ['horario_inicial', 'horario_final', 'dias_de_entrega'];

        angular.forEach(desfaz, function(campo) {
            $scope.assinatura[campo] = $scope.assinaturaOriginal[campo];
        });

        angular.forEach($scope.assinatura.quantidades, function(quantidade, id_produto) {
            $scope.assinatura.quantidades[id_produto] = $scope.assinaturaOriginal.quantidades[id_produto];
        });
    };

    Assinatura.alterar.success = function(response) {
        $scope.assinaturaOriginal = angular.copy($scope.assinatura);
        $scope.alteracaoMensagem = response.mensagem;
        $modal.open({ templateUrl: require.toUrl('minha-conta/assinatura/alteracao-sucesso.html'), scope: $scope });
    };

    Assinatura.alterar.error = function(response) {
        $scope.alteracaoErro = '' + (response.error ? response.error.message : '');
        $modal.open({ templateUrl: require.toUrl('minha-conta/assinatura/alteracao-falhou.html'), scope: $scope });
    };

}]; });
