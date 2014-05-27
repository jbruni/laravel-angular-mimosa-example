/*
 * Fatura model factory
 */

define(['angular', 'moment', 'moment-i18n', 'es5-shim', 'helper/math'], function(angular, moment) { return ['Swami', function(Swami) {

    var Fatura = Swami('faturas');

    Fatura.pk = 'id_fatura';

    Fatura.model = function() {
        this.id_fatura            = null;
        this.tipo                 = '';
        this.valor_calculado      = '0.00';
        this.valor_acrescimo      = '0.00';
        this.valor_desconto       = '0.00';
        this.valor_final          = '0.00';
        this.comentario_assinante = '';
        this.comentario_franquia  = '';
        this.quitada              = '0';
        this.nome                 = '';
        this.email                = '';
        this.situacao             = '';
        this.dias_atraso          = '';
        this.link                 = '';

        this.editar      = editar.bind(this);
        this.quitar      = quitar.bind(this);
        this.enviar      = angular.noop;
        this.detalhes    = detalhes.bind(this);
    };

    Fatura.filtros = {
        'todas': 'Todas as Faturas',
        'vencidas': 'Faturas Vencidas',
        'quitadas': 'Faturas Quitadas',
        'pedidos': 'Pedidos Avulsos',
        'assinaturas': 'Assinaturas'
    };

    Fatura.filtrar = {
        'todas':       function() { return true; },
        'vencidas':    function(fatura) { return fatura.situacao == 'vencida'; },
        'quitadas':    function(fatura) { return fatura.situacao == 'paga'; },
        'pedidos':     function(fatura) { return fatura.tipo == 'pedido'; },
        'assinaturas': function(fatura) { return fatura.tipo == 'assinatura'; },
    };

    var faturas = {
        registros: {},
        filtro:    'todas',
        periodo:   new Date(),
        filtrar:   Fatura.filtrar,
        resumo:    {}
    };

    faturas.periodoLegivel = function(fechamento) {
        var inicio = faturas.periodoInicio(),
            fim = faturas.periodoFim();
        return ' de ' + inicio.format('L') + ' a ' + fim.format('L');
    };

    faturas.periodoInicio = function(fechamento) {
        return moment(faturas.periodo).startOf('day').subtract('months', 1).date(fechamento || 5);
    };

    faturas.periodoFim = function(fechamento) {
        return moment(faturas.periodoInicio(fechamento)).add('months', 1).subtract('days', 1).endOf('day');
    };

    Fatura.faturas = faturas;

    Fatura.carregarFaturas = function() {
        faturas.registros = Fatura.where({ periodo: faturas.periodo.toISOString().substr(0,7) });
        Fatura.atualizaResumo();
    };

    Fatura.atualizaResumo = function() {
        faturas.resumo = {};
        Fatura.http('post', { periodo: faturas.periodo.toISOString().substr(0,7) }, {}, 'faturas-resumo')
        .success(function(response) { faturas.resumo = response; });
    };

    Fatura.atualizando = false;

    Fatura.editar = {
        'success': function(response) {
            var fatura = this;
            angular.forEach(response, function(value, key) {
                fatura[key] = value;
            });
            Fatura.atualizaResumo();
        },
        'error': angular.noop,
        'finally': function() { Fatura.atualizando = false; }
    };

    function editar(copia) {
        Fatura.atualizando = true;

        var dados = {
            id_fatura:           copia.id_fatura,
            data_vencimento:     moment(copia.data_vencimento).format('YYYY-MM-DD'),
            valor_acrescimo:     Math.mul(copia.valor_acrescimo, 1),
            valor_desconto:      Math.mul(copia.valor_desconto , 1),
            comentario_franquia: copia.comentario_franquia
        };

        Fatura.save(dados, 'editar-fatura')
        .success(Fatura.editar.success.bind(this))
        .error(Fatura.editar.error)
        ['finally'](Fatura.editar['finally']);
    }

    Fatura.quitar = {
        'success': function() {
            if (this.situacao == 'vencida') {
                faturas.resumo.count_vencidos = Math.sub(faturas.resumo.count_vencidos, 1);
                faturas.resumo.total_vencido = Math.sub(faturas.resumo.total_vencido, this.valor_final);
            }
            this.situacao = 'paga';
            this.quitada = '1';
            this.dias_atraso = '';
            faturas.resumo.total_pago = Math.add(faturas.resumo.total_pago, this.valor_final);
        },
        'error': angular.noop,
        'finally': function() { Fatura.atualizando = false; }
    };

    function quitar() {
        Fatura.atualizando = true;

        Fatura.save({ id_fatura: this.id_fatura }, 'quitar-fatura')
        .success(Fatura.quitar.success.bind(this))
        .error(Fatura.quitar.error)
        ['finally'](Fatura.quitar['finally']);
    }

    function detalhes() {
        return Fatura.http('post', { id_fatura: this.id_fatura }, {}, 'fatura');
    }

    return Fatura;

}]; });
