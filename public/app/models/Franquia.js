/*
 * Franquia model factory
 */

define([], function() { return ['Swami', 'Produto', function(Swami, Produto) {

    var Franquia = Swami('franquias');

    Franquia.pk = 'id_franquia';

    Franquia.hasMany('produtos', Produto);

    Franquia.atual = function() {
        return Franquia.loadFrom('franquia');
    };

    return Franquia;

}]; });
