/*
 * Assinatura model factory
 */

define(['angular', 'helper/math'], function(angular) { return ['Swami', 'Franquia', 'Produto', function(Swami, Franquia, Produto) {

    var Assinatura = Swami('assinaturas');

    Assinatura.model = function() {
        this.id_franquia      = null;
        this.dias_de_entrega  = '';
        this.quantidades      = {};
        this.valor            = 0;

        this.assinatura_ativa = null;
        this.horario_inicial  = null;
        this.horario_final    = null;
        this.pausado          = null;
        this.data_pausado_ate = null;

        this.ativar           = atualizar.bind(this, 'ativar');
        this.desativar        = atualizar.bind(this, 'desativar');
        this.pausar           = atualizar.bind(this, 'pausar');
        this.despausar        = atualizar.bind(this, 'despausar');
        this.alterar          = atualizar.bind(this, 'alterar');
    };

    Assinatura.model.prototype.atualizaValor = function(self) {

        var franquia    = Franquia.find(self.id_franquia);

        if (!franquia) return self;

        var diasEntrega = self.dias_de_entrega.split(',').length;

        var valorDiario = self.valorDiarioDaConfiguracao(self);

        self.valor = Math.add(Math.mul(franquia.entrega_mensal, 1), Math.mul(diasEntrega, 4, valorDiario));

        return self;
    };

    Assinatura.model.prototype.valorDiarioDaConfiguracao = function(self) {

        var valor = 0;

        angular.forEach(self.quantidades, function(quantidade, id_produto) {

            valor = Math.add(valor, Math.mul(quantidade, Produto.find(id_produto).getPreco(quantidade)));

        });

        return valor;
    };

    Assinatura.atualizando = false;

    Assinatura.ativar = {
        'success': angular.noop,
        'error': angular.noop,
        'finally': function() { Assinatura.atualizando = false; }
    };

    Assinatura.desativar = {
        'success': angular.noop,
        'error': angular.noop,
        'finally': function() { Assinatura.atualizando = false; }
    };

    Assinatura.pausar = {
        'success': angular.noop,
        'error': angular.noop,
        'finally': function() { Assinatura.atualizando = false; }
    };

    Assinatura.despausar = {
        'success': angular.noop,
        'error': angular.noop,
        'finally': function() { Assinatura.atualizando = false; }
    };

    Assinatura.alterar = {
        'success': angular.noop,
        'error': angular.noop,
        'finally': function() { Assinatura.atualizando = false; }
    };

    function atualizar(acao) {
        var dados = {};
        
        if (acao == 'pausar') {
            dados = { 'data_pausado_ate': this.data_pausado_ate };
        }

        if (acao == 'alterar') {
            dados = {
                'quantidades':     this.quantidades,
                'horario_inicial': this.horario_inicial,
                'horario_final':   this.horario_final,
                'dias_de_entrega': this.dias_de_entrega
            };
        }

        Assinatura.atualizando = true;

        Assinatura.save(dados, acao + '-assinatura')
        .success(Assinatura[acao].success)
        .error(Assinatura[acao].error)
        ['finally'](Assinatura[acao]['finally']);
    }

    Assinatura.atual = function() {
        return Assinatura.loadFrom('configuracao');
    };

    return Assinatura;

}]; });
