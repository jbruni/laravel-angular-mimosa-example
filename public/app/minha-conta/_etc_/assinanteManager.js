
/*** Assinante Manager service provider (entityManager extension) ***/

define(['minha-conta/providers/entityManager', 'pdm', 'angular'], function(em, pdm) { return function($resource, $http, $timeout) {

	/*** CONFIGURAÇÕES DO ASSINANTE ***/

	em.configuracao = $resource('config').get({}, em.syncOriginal);
	em.franquia = $resource('franquia').get();
	em.faturas = $resource('faturas').get();

	em.salvarConfiguracao = function() {
		em.configuracao.$save({}, em.syncOriginal);
	};

	em.salvarPausa = function() {
		var configuracao = em.configuracao;
		if (!em.isDirty(em.configuracao, 'pausado') && !em.isDirty(em.configuracao, 'pausado_dias') && !em.isDirty(em.configuracao, 'data_pausado_ate')) {
			return;
		}
		$http.post('pausado', {
			pausado: configuracao.pausado,
			data_pausado_ate: configuracao.data_pausado_ate
		});
		em.sync(configuracao, ['pausado', 'pausado_dias', 'data_pausado_ate']);
	};

	em.refreshValorAssinatura = function() {
		if (!em.franquia.$resolved || !em.configuracao.$resolved) {
			return $timeout(em.refreshValorAssinatura, 108);
		}
		var diasEntrega = em.configuracao.dias_de_entrega.split(',').length,
		    valorDiario = em.valorDiarioDaConfiguracao();

		em.configuracao.valor = Math.add(Math.mul(em.franquia.entrega_mensal, 1), Math.mul(diasEntrega, 4, valorDiario));
	};

	em.valorDiarioDaConfiguracao = function() {
		var valor = 0;
		angular.forEach(em.configuracao.quantidades, function(item){
			valor = Math.add(valor, Math.mul(item.quantidade, em.precoDoItem(item, item.quantidade)));
		});
		return valor;
	};

	em.precoDoItem = function(item, quantidade) {
		var quantidade = Math.mul(quantidade, 1), preco = 0;
		angular.forEach(item.precos, function(faixa) {
			if ((quantidade >= Math.mul(faixa.qtde_min, 1)) && (quantidade <= Math.mul(faixa.qtde_max, 1))) {
				preco = Math.mul(faixa.valor, 1);
			}
		});
		return preco;
	};

	em.ativarAssinatura = function() {
		$http.post('ativar-assinatura').success(function(data){
			if (data.sucesso) em.configuracao.assinatura_ativa = 1;
		});
	};

	em.desativarAssinatura = function() {
		$http.post('desativar-assinatura').success(function(data){
			if (data.sucesso) em.configuracao.assinatura_ativa = 0;
		});
	};


	/*** LOJA DE CONVENIÊNCIA ***/

	em.cesta = {
		esvaziar: function() {
			em.cesta.itens = [];
			em.cesta.total = 0;
			em.cesta.data = pdm.tomorrow();
			if (pdm.depoisDasOito()) pdm.addDays(em.cesta.data, 1);
		},
		sum: function() {
			em.cesta.total = 0;
			angular.forEach(em.cesta.itens, function(item) {
				em.cesta.total = Math.add(em.cesta.total, item.total);
			});
			return em.cesta.total;
		}
	};
	em.cesta.esvaziar();

	em.categorias = {
		selecionada: { produtos: [] },
		resource: $resource('categorias')
	};

	em.categorias.carregar = function() {
		if (angular.isDefined(em.categorias.lista)) return;
		em.categorias.lista = em.categorias.resource.query({}, function(){
			em.categorias.selecionada = em.categorias.lista[0];
		});
	};

	em.produtos = {
		resource: $resource('produtos')
	};

	em.produtos.carregar = function() {
		if (angular.isDefined(em.produtos.lista)) return;
		em.produtos.lista = em.produtos.resource.query();
	};

	em.pedidos = { resource: $resource('pedidos') };

	em.pedidos.carregar = function() {
		em.pedidos.lista = em.pedidos.resource.query({}, function() {
			em.pedidos.confirmados = {};
			// agrupar os pedidos por data
			angular.forEach(em.pedidos.lista, function(value) {
				if (!angular.isDefined(em.pedidos.confirmados[value.data])) {
					em.pedidos.confirmados[value.data]= [];
				}
				em.pedidos.confirmados[value.data].push(value);
				value._data = pdm.makeDate(value.data);
			});
		});
	};

	em.pedidos.incluir = function(sucesso, falha) {
		em.pedidos.resource.save({}, {
			'data': pdm.formatDate(em.cesta.data),
			'itens': em.cesta.itens,
			'total': em.cesta.total,
			'_method': 'PUT'
		}, sucesso, falha);
	};

	em.pedidos.excluir = function(data, index) {
		em.pedidos.resource.save({}, {
			'id_pedido': em.pedidos.confirmados[data][index].id_pedido,
			'_method': 'DELETE'
		}, function(result) {
			// em.configuracao.paes_em_haver = Math.add(em.configuracao.paes_em_haver, Math.mul(result.paes_em_haver, 1));
			em.pedidos.carregar();
		});
	};


	/*** HISTÓRICO ***/

	em.historico = $resource('historico');


	/*** MEUS DADOS ***/

	em.assinante = $resource('assinante');

	return em;

}});
