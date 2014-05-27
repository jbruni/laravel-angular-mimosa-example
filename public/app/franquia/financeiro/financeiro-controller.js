
/*** Franquia - Financeiro controller ***/

define(['jquery', 'angular', 'require', 'zeroclipboard', 'moment', 'helper/math'], function($, angular, require, ZeroClipboard, moment) {
return ['$scope', '$modal', 'Fatura', function($scope, $modal, Fatura) {

    $scope.faturas = Fatura.faturas;

    $scope.opcoes = {
        filtro: Fatura.filtros
    };

    /*
     * Carrega faturas de acordo com o mês escolhido
     */
    $scope.$watch('faturas.periodo', function(value) {
        // Fechar calendário se estiver visível
        if ($('#popover-calendario-periodo').is(':visible')) {
            setTimeout(function() { $('#trigger-calendario-periodo').click(); });
        }
        if (value) {
            Fatura.carregarFaturas();
        }
    });

    /*
     * Fechar lista de opcoes de filtragem, se estiver visível
     */
    $scope.$watch('faturas.filtro', function(value) {
        if ($('#popover-opcoes-filtro').is(':visible')) {
            setTimeout(function() { $('#trigger-opcoes-filtro').click(); });
        }
    });

    /*
     * Ordenar faturas pelo nome/empresa
     */
    $scope.faturaSort = function(id_fatura) {
        return $scope.faturas.registros[id_fatura].nome;
    };

    /*
     * Exibir modal de confirmação para a ação escolhida
     */
    $scope.confirmaAtualizarFatura = function(fatura, acao) {

        if (Fatura.atualizando) {
            return false;
        }

        $scope.fatura = fatura;
        $scope.copia = angular.copy(fatura);

        $modal.open({ templateUrl: require.toUrl('franquia/financeiro/confirma-' + acao + '.html'), scope: $scope })
        .result.then( fatura[acao].bind($scope.copia) );
    };

    /*
     * Ação: "linkar"
     */
    ZeroClipboard.config( { moviePath: require.toUrl('vendor/zeroclipboard/ZeroClipboard.swf') } );

    $scope.copiarLink = function() {
        var client = new ZeroClipboard(document.getElementById('copiar-link'));
        client.on('complete', function () { $scope.$apply( function() { $scope.fatura.linkCopiado = true; } ); });
    };

    /*
     * Mostrar detalhes de uma fatura
     */
    $scope.mostrarDetalhes = function(id_fatura) {
        var fatura = Fatura.find(id_fatura);
        fatura.detalhes().success(function(response) {
            $scope.fatura = response;
            $scope.fatura.nome = fatura.nome;
            $modal.open({ templateUrl: require.toUrl('franquia/financeiro/detalhes-fatura.html'), scope: $scope });
        });
    };

    /*
     * Ação: "editar" (ajustar)
     */
    $scope.moment = moment;

    $scope.valorFinal = function(calculado, acrescimo, desconto) {
        var valor = Math.sub(Math.add(calculado, acrescimo), desconto);
        return isNaN(valor) ? calculado : valor;
    };

    $(document).on('click', '#popover-calendario-vencimento table[ng-switch-when="day"] tbody button', function() {
        $('#trigger-calendario-vencimento').click();
    });

    Fatura.editar.error = function(response) {
        $scope.ajusteErro = '' + (response.error ? response.error.message : '');
        $modal.open({ templateUrl: require.toUrl('franquia/financeiro/ajuste-falhou.html'), scope: $scope });
    };

    $scope.vcto = function(vcto) {
        return vcto.substr(-2) + '/' + vcto.substr(5, 2) + '/' + vcto.substr(0, 4);
    };

}];
});
