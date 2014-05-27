/*
 * Produto model factory
 */

define(['angular', 'helper/math'], function(angular) { return ['Swami', function(Swami) {

    var Produto = Swami('produtos');

    Produto.pk = 'id_produto';

    Produto.model = function() {
        this.id_produto = null;
        this.nome       = '';
        this.precos     = [];
    };

    Produto.model.prototype.getPreco = function(quantidade) {

        var self       = this,
            preco      = 0;

        quantidade = Math.mul(quantidade, 1);

        angular.forEach(self.precos, function(faixa) {

            if ((quantidade >= Math.mul(faixa.qtde_min, 1)) && (quantidade <= Math.mul(faixa.qtde_max, 1))) {

                preco = Math.mul(faixa.valor, 1);
            }
        });

        return preco;
    };

    return Produto;

}]; });
