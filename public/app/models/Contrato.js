/*
 * Contrato model factory
 */

define(['angular'], function(angular) { return ['Swami', function(Swami) {

    var Contrato = Swami('contratos');

    Contrato.model = function() {
        this.id_franquia         = null;
        this.dias_de_entrega     = '';
        this.horario_inicial_min = '06:00';
        this.horario_final_max   = '11:00';
        this.entrega_mensal      = '0';
        this.entrega_avulsa      = '0';
        this.pedido_minimo       = '0';
        this.horario_fechamento  = '20';

        this.alterar             = alterar.bind(this);
    };

    Contrato.atualizando = false;

    Contrato.alterar = {
        'success': angular.noop,
        'error': angular.noop,
        'finally': function() { Contrato.atualizando = false; }
    };

    function alterar() {
        Contrato.atualizando = true;

        Contrato.save(this, 'alterar-contrato')
        .success(Contrato.alterar.success)
        .error(Contrato.alterar.error)
        ['finally'](Contrato.alterar['finally']);
    }

    Contrato.atual = function() {
        return Contrato.loadFrom('contrato');
    };

    Contrato.opcoes = {
        dias_de_entrega: {
            'SEG,TER,QUA,QUI,SEX':         'de Segunda a Sexta',
            'SEG,TER,QUA,QUI,SEX,SAB':     'de Segunda a Sábado',
            'SEG,TER,QUA,QUI,SEX,SAB,DOM': 'de Segunda a Domingo'
        },
        horario_fechamento: {
            '18': '18:00 hs',
            '19': '19:00 hs',
            '20': '20:00 hs',
            '21': '21:00 hs',
            '22': '22:00 hs'
        }
    };

    return Contrato;

}]; });
