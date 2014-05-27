/*
 * Assinante model factory
 */

define(['angular'], function(angular) { return ['Swami', 'Endereco', function(Swami, Endereco) {

    var Assinante = Swami('assinantes');

    Assinante.pk = 'id_assinante';

    Assinante.model = function() {
        this.id_assinante = null;
        this.nome     = '';
        this.telefone = '';
        this.email    = '';
        this.senha    = '';
        this.cpf      = '';
        this.extra = {
            conheceu: 'amigos',
            tipo:     'condominio',
            local:    ''
        };
        this.endereco = Endereco.create();
        this.cadastrar = salvar.bind(this, true);
        this.alterar = salvar.bind(this);
        this.alterarStatus = alterarStatus.bind(this);
    };

    // Campo CPF aceita também CNPJ
    Assinante.model.prototype.validation = {
        cpf: /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
        telefone: /^[0-9 ()-]*$/
    };

    Assinante.hasOne('endereco', Endereco);

    Assinante.opcoes = Swami('/extras').all();

    Assinante.salvando = false;

    Assinante.salvar = {
        'success': angular.noop,
        'error': angular.noop,
        'finally': function() { Assinante.salvando = false; }
    };

    function salvar(novo) {
        if (novo && (this.id_assinante !== null)) {
            return;
        }

        if (Assinante.salvando)  {
            return;
        }

        Assinante.salvando = true;

        Assinante.save(this, novo ? 'assine' : 'atualizar')
        .success(Assinante.salvar.success)
        .error(Assinante.salvar.error)
        ['finally'](Assinante.salvar['finally']);
    }

    Assinante.alterarStatus = {
        'success': function() { this.aguardando = this.novoStatus; },
        'error': angular.noop,
        'finally': function() { Assinante.salvando = false; }
    };

    function alterarStatus() {
        Assinante.salvando = true;

        Assinante.save({ id_assinante: this.id_assinante, status: this.novoStatus }, 'alterar-status')
        .success(Assinante.alterarStatus.success.bind(this))
        .error(Assinante.alterarStatus.error)
        ['finally'](Assinante.alterarStatus['finally']);
    }

    Assinante.atual = function() {
        return Assinante.loadFrom('meus-dados');
    };

    return Assinante;

}]; });
