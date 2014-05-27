/*
 * Entrega model factory
 */

define(['angular'], function(angular) { return ['Swami', function(Swami) {

    var Entrega= Swami('entregas');

    Entrega.lista = {
        fechada: true,
        ocorrencias: [],
        pausados: [],
        entregas: [],
        totais: []
    };

    Entrega.carregarLista = function(data) {
        Entrega.http('post', { data: data.toISOString().substr(0,10) })
        .success(function(response){
            for (var prop in Entrega.lista) {
                Entrega.lista[prop] = response[prop];
            }
        });
    };

    Entrega.entregadores = {};

    Entrega.http('get', {}, {}, 'entregadores')
    .success(function(response){
        $.extend(Entrega.entregadores, response);
    });

    Entrega.salvarOrdenacao = function(info, data) {
        Entrega.http('post', {
            'info': info,
            'data': data.toISOString().substr(0,10)
        }, {}, 'ordena-lista');
    };

    Entrega.ocorrencias = {
        'ativou':         'ATIVOU a assinatura',
        'desativou':      'DESATIVOU a assinatura',
        'alterou':        'ALTEROU as configurações da assinatura (DIAS e/ou PRODUTOS)',
        'alterouHorario': 'ALTEROU sua preferência de HORÁRIO de entrega',
        'pausou':         'COMEÇOU PAUSA na entrega',
        'despausou':      'teve a sua PAUSA ENCERRADA e retorno das entregas'
    };

    return Entrega;

}]; });
