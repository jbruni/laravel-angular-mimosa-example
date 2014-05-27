
/*** Franquia - Lista de Entrega controller ***/

define(['jquery', 'moment'], function($, moment) { return ['$scope', '$timeout', 'Entrega', function($scope, $timeout, Entrega) {

    $scope.dataEntrega  = moment().add('hours', 12).startOf('day').toDate();

    $scope.entregadores = Entrega.entregadores;

    $scope.lista = Entrega.lista;

    $scope.ocorrencias = Entrega.ocorrencias;

    /*
     * Carrega lista de entrega de acordo com a data escolhida
     */
    $scope.$watch('dataEntrega', function(value) {
        // Fechar calendário se estiver visível
        if ($('#popover-calendario').is(':visible')) {
            setTimeout(function() { $('#trigger-calendario').click(); });
        }
        if (value) {
            Entrega.carregarLista($scope.dataEntrega);
        }
    });

    /*
     * Abre nova aba para imprimir conteúdo html específico
     */
    function imprimir(html) {
        var WinPrint = window.open('', '');
        WinPrint.document.open("text/html", "replace");
        WinPrint.document.write(html);
        WinPrint.document.close();
        WinPrint.focus();
        setTimeout(function() {
            WinPrint.print();
            WinPrint.close();
        }, 1008);
    }

    /*
     * Obtém DOM para impressão da lista
     */
    function bodyLista(id_entregador) {
        var $body = $('html').clone();

        $body.find('script').remove();
        $body.find('div.header').remove();
        $body.find('div.acoes').remove();
        $body.find('button').remove();
        $body.find('select').remove();
        $body.find('.pdm-menu').remove();
        $body.find('.sr-only').remove();
        $body.find('#top').remove();
        $body.find('#footer').remove();

        if (id_entregador === undefined) {
            $body.find('title').text($body.find('h4').text());
        } else {
            var title = $body.find('h4').text() + ' (' + ($scope.entregadores[id_entregador] ? $scope.entregadores[id_entregador] : 'Sem entregador selecionado') + ')',
                selector = '[data-id-entregador="' + id_entregador + '"]';
            $body.find('title').text(title);
            $body.find('h4').text(title);
            $body.find('table.totais').remove();
            // $body.find('div.lista[ng-if="pausados"]').remove();
            $body.find('div.lista strong.entregador').not(selector).remove();
            $body.find('div.entregar').not(selector).not('.em-pausa').remove();
        }

        return $body;
    }

    /*
     * Imprimir tabela de produtos (totais)
     */
    $scope.imprimirProdutos = function() {
        var $body = bodyLista();

        $body.find('div.lista').remove();

        imprimir($body.html());
    };

    /*
     * Imprimir lista de entrega (completa ou filtrada por entregador)
     */
    $scope.imprimirLista = function(id_entregador) {
        imprimir(bodyLista(id_entregador).html());
    };

    /*
     * Imprimir lista de entregas só com produtos (para a padaria)
     */
    $scope.imprimirListaParaPadaria = function() {
        var $body = bodyLista();

        $body.find('div.ocorrencias').remove();
        $body.find('div.lista[ng-if="pausados"]').remove();
        $body.find('div.lista').replaceWith(
            $body.find('div.lista ul').addClass('padaria').detach()
        );

        imprimir($body.html());
    };

    /*
     * Seleciona um entregador para uma entrega
     */
    $scope.mudaEntregador = function(entregas, index) {
        var entrega = entregas.splice(index, 1)[0],
            id_entregador = (entrega.id_entregador * 1).toString(),
            item;
        // http://stackoverflow.com/a/8108213/370290
        while (!!(item = entregas[index++])) { item.ordenacao--; }
        if ($scope.lista.entregas[id_entregador]) {
            $scope.lista.entregas[id_entregador].push(entrega);
            entrega.ordenacao = $scope.lista.entregas[id_entregador].length;
        } else {
            $scope.lista.entregas[id_entregador] = [entrega];
            entrega.ordenacao = 1;
        }
        $scope.salvaOrdenacao();
    };

    /*
     * Muda a ordenação de uma entrega
     */
    $scope.reordena = function(entregas, index, diff) {
        var id_entrega = entregas[index].id_entrega;
        entregas[index].ordenacao += diff;
        entregas[index + diff].ordenacao -= diff;
        entregas[index] = entregas.splice(index + diff, 1, entregas[index])[0];
        // http://stackoverflow.com/a/4011851/370290
        $scope.salvaOrdenacao();

        var $div = $('div.entregar[data-id-entrega="' + id_entrega + '"]');
        $div.css('backgroundColor', '#F6F6D6');
        window.setTimeout(function(){ $div.css('backgroundColor', '#F6F6F6'); }, 1800);
    };

    /*
     * Envia a nova ordenação para ser salva no servidor
     */
    $scope.salvaOrdenacao = function() {
        var info = [];
        angular.forEach($scope.lista.entregas, function(entregas){
            angular.forEach(entregas, function(entrega){
                info.push({
                    id_entrega: entrega.id_entrega,
                    id_entregador: entrega.id_entregador,
                    ordenacao: entrega.ordenacao
                });
            });
        });
        Entrega.salvarOrdenacao(info, $scope.dataEntrega);
    };

}]; });
