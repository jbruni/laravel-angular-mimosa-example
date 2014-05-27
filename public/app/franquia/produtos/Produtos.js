
/*** Produtos "Entity Manager" ***/

define(['angular', 'jquery'], function(angular, $) { return ['$resource', '$http', function($resource, $http) {

    var em = {};


    /*** CATEGORIAS ***/

    em.categorias = {
        nova: { nome: '' },
        todas: { id_categoria: 0, nome: 'Todos os Produtos', produtos: [] },
        resource: $resource('categorias')
    };

    em.categorias.carregar = function() {
        em.categorias.lista = em.categorias.resource.query();
        em.categorias.selecionada = em.categorias.todas;
    };

    em.categorias.incluir = function() {
        if (!em.categorias.nova.nome) return;
        em.categorias.resource.save({}, {
            'nome': em.categorias.nova.nome,
            '_method': 'PUT'
        }, function(categoria) {
            em.categorias.lista.push(categoria);
            em.categorias.nova.nome = '';
        });
    };

    em.categorias.excluir = function() {
        em.categorias.resource.save({}, {
            'id_categoria': em.categorias.selecionada.id_categoria,
            '_method': 'DELETE'
        });
        em.categorias.lista.splice(em.categorias.selecionada.index, 1);
        em.categorias.selecionada = em.categorias.todas;
    };

    em.categorias.incluirProduto = function(produto, categoria) {
        var id_produto = produto.id_produto;
        if ($.inArray(id_produto, categoria.produtos) == -1) {
            categoria.produtos.push(id_produto);
            $http.post('produto-categoria', {
                'id_categoria': categoria.id_categoria,
                'id_produto': id_produto,
                '_method': 'PUT'
            });
        }
    };

    em.categorias.excluirProduto = function(produto, categoria) {
        var id_produto = produto.id_produto,
            index = $.inArray(id_produto, categoria.produtos);
        if (index > -1) {
            categoria.produtos.splice(index, 1);
            $http.post('produto-categoria', {
                'id_categoria': categoria.id_categoria,
                'id_produto': id_produto,
                '_method': 'DELETE'
            });
        }
    };


    /*** PRODUTOS ***/

    em.produtos = {
        novo: { nome: '', medida: 'unidade', preco: '0.00', ativo: '1', encomenda: '1', assinavel: '0' },
        opcoes_medida: ['unidade', 'grama'],
        opcoes_ativo: ['0', '1'],
        opcoes_encomenda: ['0', '1'],
        resource: $resource('produtos')
    };

    em.produtos.carregar = function() {
        em.produtos.lista = em.produtos.resource.query();
    };

    em.produtos.incluir = function() {
        var categoria = em.categorias.selecionada;
        if (!em.produtos.novo.nome) return;
        em.produtos.resource.save({}, {
            'produto': em.produtos.novo,
            'id_categoria': categoria.id_categoria,
            '_method': 'PUT'
        }, function(produto) {
            em.produtos.incluido = em.produtos.novo;
            em.produtos.novo = { nome: '', medida: 'unidade', preco: '0.00', ativo: '1' };
            produto.id_produto += '';
            categoria.produtos.push(produto.id_produto);
            em.produtos.lista.push(produto);
        });
    };

    em.produtos.excluir = function() {
        em.produtos.lista.splice(em.produtos.selecionado.index, 1);
        em.produtos.resource.save({}, {
            'id_produto': em.produtos.selecionado.id_produto,
            '_method': 'DELETE'
        });
        em.produtos.selecionado = null;
    };

    em.produtos.salvar = function() {
        em.produtos.resource.save({}, em.produtos.selecionado);
    };

    em.produtos.salvarFaixasDePreco = function(produto, faixas) {
        $http.post('precos-produto', {
            'id_produto': produto.id_produto,
            'precos': faixas
        }).success(function(data) {
            if ($.isArray(data)) {
                produto.precos = data;
            }
        });
    };

    return em;

}]; });
