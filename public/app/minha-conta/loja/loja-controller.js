
/*** Loja controller ***/

define([], function() { return function() {}; });

/*
define(['pdm', 'jquery'], function(pdm, $) { return ['$scope', '$timeout', '$modal', 'entityManager', function($scope, $timeout, $modal, em) {

	$scope.categorias = em.categorias;
	$scope.categorias.carregar();

	$scope.produtos = em.produtos;
	$scope.produtos.carregar();

	$scope.pedidos = em.pedidos;
	$scope.pedidos.carregar();

	$scope.cesta = em.cesta;
	$scope.precoDoItem = em.precoDoItem;

	// Filtra produtos da categoria selecionada
	$scope.filterProdCateg = function(id_produto) {
		return ($.inArray(id_produto, $scope.categorias.selecionada.produtos) > -1);
	};

	// Incluir produto na cesta de compras
	$scope.adicionar = function(quantidade, produto) {
		if (!quantidade) return;

		var quant_final = quantidade; 

		/* Pães em Haver
		var quant_final = quantidade, c = $scope.configuracao, sub;

		if (produto.id_produto == 0) {
			// Quanto vamos subtrair dos pães em haver?
			sub = Math.mul(quantidade > c.paes_em_haver ? c.paes_em_haver : quantidade, 1);
			c.paes_em_haver = Math.sub(c.paes_em_haver, sub);
			quant_final = Math.sub(quantidade, sub);
			if (sub > 0) {
				$scope.cesta.itens.push({
					quantidade: sub,
					produto: produto,
					aviso: ' (pão em haver: não será cobrado)',
					total: 0
				});
			}
			if (quant_final < 1) return;
		}*

		$scope.cesta.itens.push({
			quantidade: quant_final,
			produto: produto,
			total: Math.mul(quant_final, Math.div($scope.precoDoItem(produto, quant_final), (produto.medida == 'grama' ? 1000 : 1)))
		});
	}

	// Remover produto da cesta de compras
	$scope.remover = function(key) {
		var item = $scope.cesta.itens.splice(key, 1)[0];

		// Restaurar pães em haver
		if ((item.produto.id_produto == 0) && (item.total == 0)) {
			$scope.configuracao.paes_em_haver = Math.add($scope.configuracao.paes_em_haver, item.quantidade);
		}
	}

	// Fechar o calendário
	$scope.fecharCalendario = function() {
		$timeout(function(){ $('#calendario').click(); }, 9);
	};

	// Confirmar um pedido
	$scope.confirmarPedido = function() {
		if (em.configuracao.status != 'N') {
			$scope.notifier.show('pedido-impossibilitado');
			return $timeout(function(){
				$scope.notifier.hide('pedido-impossibilitado');
			}, 9000);
		}
		var confirmaPedido = $modal.open({
			templateUrl: 'confirmar-pedido.html',
			scope: $scope
		});
		confirmaPedido.result.then(function() {
			$scope.pedidos.incluir(function(result) {
				if (result.sucesso == false) return erro();
				$scope.confirmado.data = pdm.formatDate($scope.cesta.data);
				$scope.confirmado._data = $scope.cesta.data;
				$scope.notifier.show('pedido-confirmado');
				$scope.cesta.esvaziar();
				$scope.pedidos.carregar();
				$timeout(function(){
					$scope.notifier.hide('pedido-confirmado');
				}, 5000);
			}, erro);
		});
		function erro() {
			$scope.notifier.show('pedido-rejeitado');
			$timeout(function(){
				$scope.notifier.hide('pedido-rejeitado');
			}, 9000);
		};
	};

	// Confirmar cancelamento de um pedido
	$scope.confirmaCancelarPedido = function (data, index) {
		$scope.pedidos.selecionado = $scope.pedidos.confirmados[data][index];
		var cancelaPedido = $modal.open({
			templateUrl: 'cancelar-pedido.html',
			scope: $scope
		});
		cancelaPedido.result.then(function() {
			$scope.pedidos.excluir(data, index);
		});
	};

	$scope.desabilitarData = function(data, modo) {
		if (modo != 'day') return false;
		if (angular.isDefined($scope.configuracao._original)) {
			var config = $scope.configuracao._original,
			    valido = config.dias_de_entrega.split(',');
			if ($.inArray($scope.diasDaSemana[data.getDay()], valido) == -1) {
				return true;
			}
			var data_pausado_ate = pdm.makeDate(config.data_pausado_ate);
			if ((config.pausado == 1) && (data <= data_pausado_ate)) {
				return true;
			}
		}
	};

}] });
*/
