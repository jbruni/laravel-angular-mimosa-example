/*
 * Endereco model factory
 */

define(['angular'], function(angular) { return ['$http', 'Swami', function($http, Swami) {

    var Endereco = Swami('enderecos'),

        cepRequests = {};

    Endereco.pk = 'id_endereco';

    Endereco.model = function() {
        this.id_endereco = null;
        this.cep         = '';
        this.logradouro  = '';
        this.numero      = '';
        this.complemento = '';
        this.bairro      = '';

        this.buscarEndereco = buscarEndereco.bind(this);
        this.atualizarEndereco = atualizarEndereco.bind(this);
    };

    Endereco.model.prototype.validation = {
        cep: /^[0-9]{5}-?([0-9]{3})?$/
    };

    /* Busca de endereço por CEP */

    function buscarEndereco() {
        if (ok(this.cep)) {
            cepRequest(this.cep).success(this.atualizarEndereco);
        }
    }

    function atualizarEndereco(endereco) {
        if (ok(endereco.logradouro)) {
            var tipo = (ok(endereco.tipo_logradouro) ? endereco.tipo_logradouro + ' ' : '');
            this.logradouro = tipo + endereco.logradouro;
        }
        if (ok(endereco.bairro)) {
            this.bairro = endereco.bairro;
        }
    }

    function cepRequest(cep) {
        cep = cep.replace('-', '');
        if (!angular.isDefined(cepRequests[cep])) {
            cepRequests[cep] = $http.jsonp('http://cep.republicavirtual.com.br/web_cep.php?cep=' + cep + '&formato=jsonp&callback=JSON_CALLBACK');
        }
        return cepRequests[cep];
    }

    function ok(thing) { return angular.isDefined(thing) && (thing !== ''); }

    return Endereco;

}]; });
