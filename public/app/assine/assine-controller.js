/*
 * AssineController AngularJS controller
 */

define(['angular', 'es5-shim'], function(angular) { return ['$scope', 'Franquia', 'Assinatura', function($scope, Franquia, Assinatura) {

    $scope.keys = Object.keys;

    $scope.franquias = Franquia.all();

    $scope.assinatura = Assinatura.nova = Assinatura.create();

    /*
     * Quando carregar as franquias, selecionar a primeira para a assinatura
     */
    var unwatchFranquias = $scope.$watchCollection('franquias', function(franquias) {

        if ($.isEmptyObject(franquias)) return;

        $scope.assinatura.id_franquia = Franquia.first();

        $('#assine').removeClass('hidden');
        $('#cadastre').slideUp();

        unwatchFranquias();
    });

    /*
     * Quando selecionar uma franquia para a assinatura, atualizar a franquia do escopo
     */
    $scope.$watch('assinatura.id_franquia', function(id_franquia) {

        if (!id_franquia) return;

        $scope.franquia = $scope.franquias[id_franquia];

        // Se não houver a opção de dias de entrega previamente selecionada,
        // selecionar uma opção válida (primeira da lista)
        if (!$scope.franquia.opcoes_dias_de_entrega[$scope.assinatura.dias_de_entrega]) {
            $scope.assinatura.dias_de_entrega = Franquia.first($scope.franquia.opcoes_dias_de_entrega);
        }

        var first = true;

        $scope.assinatura.quantidades = {};

        angular.forEach($scope.franquia.produtos, function(produto, id_produto) {
            $scope.assinatura.quantidades[id_produto] = (first ? '5': '0');
            first = false;
        });
    });

    $scope.$watch('assinatura', $scope.assinatura.atualizaValor, true);

    $scope.cadastrar = function() {
        $('#assine').slideUp();
        $('#cadastre').removeClass('hidden').slideDown();
    };

}]; });
