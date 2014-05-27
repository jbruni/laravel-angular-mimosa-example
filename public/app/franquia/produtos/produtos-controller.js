
/*** Franquia - Produtos controller ***/

define(['jquery', 'require'], function($, require) { 
return ['$rootScope', '$scope', '$modal', '$timeout', 'Produtos', function($rootScope, $scope, $modal, $timeout, em) {

    $scope.categorias = em.categorias;
    $scope.categorias.carregar();

    $scope.produtos = em.produtos;
    $scope.produtos.carregar();

    $scope.filterProdCateg = function(id_produto) {
        if ($scope.categorias.selecionada.id_categoria === 0) return true;
        return ($.inArray(id_produto, $scope.categorias.selecionada.produtos) > -1);
    };

    $scope.confirmaExcluirCategoria = function() {
        var confirmDelete = $modal.open({
            templateUrl: require.toUrl('franquia/produtos/excluir-categoria.html'),
            scope: $scope
        });
        confirmDelete.result.then($scope.categorias.excluir);
    };

    $scope.incluirProdutoNaCategoria = function(produto, categoria) {
        $rootScope.alerts.push({type: 'success', message: 'Produto ' + produto.nome + ' incluído na categoria ' + categoria.nome + '.'});
        $scope.categorias.incluirProduto(produto, categoria);
    };

    $scope.confirmaRemoverDaCategoria = function(produto, categoria) {
        $scope.produtos.selecionado = produto;
        var confirmRemove = $modal.open({
            templateUrl: require.toUrl('franquia/produtos/remover-da-categoria.html'),
            scope: $scope
        });
        confirmRemove.result.then(function() {
            $scope.categorias.excluirProduto(produto, categoria);
        });
    };

    $scope.$watch('produtos.incluido', function(produto) {
        if (!produto) {
            return;
        }
        $rootScope.alerts.push({type: 'success', message: 'O produto ' + produto.nome + ' foi incluído com sucesso.'});
        $scope.novo_produto.$setPristine();
        $scope.produtos.incluido = null;
    });

    $scope.confirmaExcluirProduto = function(index) {
        $scope.produtos.selecionado = $scope.produtos.lista[index];
        $scope.produtos.selecionado.index = index;
        var confirmDelete = $modal.open({
            templateUrl: require.toUrl('franquia/produtos/excluir-produto.html'),
            scope: $scope
        });
        confirmDelete.result.then($scope.produtos.excluir);
    };

    $scope.confirmaSalvarProduto = function(produto, form) {
        if (form.$pristine) return;
        $scope.produtos.selecionado = produto;
        $scope.produtos.selecionado.form = form;
        var confirmSave = $modal.open({
            templateUrl: require.toUrl('franquia/produtos/salvar-produto.html'),
            scope: $scope
        });
        confirmSave.result.then(function() {
            form.$setPristine();
            delete $scope.produtos.selecionado.form;
            $scope.produtos.salvar();
        });
    };

    $scope.uploadImagemDoProduto = function(produto) {
        $scope.produtos.selecionado = produto;
        $scope.upload = {};
        var uploadImage = $modal.open({
            templateUrl: require.toUrl('franquia/produtos/upload-imagem.html'),
            scope: $scope
        });
    };

    $scope.uploadComplete = function (content, completed) {
        if (content.resultado) {
            $scope.upload.status = content.resultado;
            $scope.produtos.selecionado.u = new Date().getTime();
        } else {
            $scope.upload.status = 'Falha no envio do arquivo.';
        }
    };

    $scope.faixasDePreco = function(index) {
        $scope.produtos.selecionado = $scope.produtos.lista[index];
        $scope.faixas = angular.copy($scope.produtos.selecionado.precos);
        var faixasDePreco = $modal.open({
            templateUrl: require.toUrl('franquia/produtos/faixas-de-preco.html'),
            scope: $scope
        });
        faixasDePreco.result.then(function() {
            $scope.produtos.salvarFaixasDePreco($scope.produtos.selecionado, $scope.faixas);
        });
    };

    $scope.novaFaixaDePreco = function(index) {
        var faixa = $scope.faixas[index],
            minimo = parseInt(prompt('Digite a quantidade mínima para a nova faixa, de ' + (faixa.qtde_min * 1 + 1) + ' a ' + faixa.qtde_max + ':', ''));
        if ((minimo > faixa.qtde_min) && (minimo <= faixa.qtde_max)) {
            var nova_faixa = angular.copy(faixa);
            nova_faixa.qtde_min = minimo;
            nova_faixa.qtde_max = $scope.faixas[index].qtde_max;
            $scope.faixas[index].qtde_max = minimo * 1 - 1;
            $scope.faixas.splice(index + 1, 0, nova_faixa);
        }
    };

    $scope.excluirFaixaDePreco = function(index) {
        var faixa = $scope.faixas.splice(index, 1);
        if (index === 0) {
            $scope.faixas[0].qtde_min = 1;
        } else {
            $scope.faixas[index - 1].qtde_max = faixa[0].qtde_max;
        }
    };

}]; });
