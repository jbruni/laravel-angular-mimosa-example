@extends('layouts.master')

@section('styles')
        <link rel="stylesheet" href="{{ URL::asset(($production ? 'dist' : 'app') . '/directives/pdm-directives.css') }}">
@stop

@section('content')
<article id="assine" ng-controller="assineController" ng-class="{wait: carregando}" class="hidden">
    <div>
        <div class="calcule">
            <div class="header">
                <h1 class="sr-only">Calcule sua Assinatura</h1>
            </div>
            <div class="form-group">
                <label>Escolha sua cidade:</label>
                <select class="pdm-select" ng-model="assinatura.id_franquia" ng-options="id_franquia as franquia.cidade for (id_franquia, franquia) in franquias"></select>
            </div>
            <div class="form-group">
                <br>
                <label>Selecione a<span ng-if="keys(assinatura.quantidades).length != 1">s</span> quantidade<span ng-if="keys(assinatura.quantidades).length != 1">s</span>:</label>
            </div>
        </div>
        <div class="sticker">
            <div>
                <p class="sr-only">Ligue e Peça</p>
                <p class="cidade" ng-bind="franquia.cidade"></p>
                <p class="telefone" ng-bind="franquia.telefone"></p>
                <p class="telefone" ng-bind="franquia.telefone2"></p>
            </div>
        </div>
        <div class="logotipo">
            <p>
                Nossos panificados são da<br>
                <strong ng-bind="'Padaria ' + franquia.nome"> </strong>
            </p>
            <img ng-if="franquia.id_franquia" ng-src="{{ URL::asset('upload/logotipos/franquia-') }}@{{ franquia.id_franquia }}.png">
        </div>
    </div>
    <div ng-repeat="(id_produto, produto) in franquia.produtos">
        <div class="quantidade">
            <div class="form-group">
                <label><span ng-bind="produto.nome"></span></label>
                <div slider class="seletor-quantidade" values="0,1,2,3,4,5,6,7,8,9,10,15,20,30,50" positions="0,60,120,180,240,300,360,420,480,547,610,675,739,794,851" ng-model="assinatura.quantidades[id_produto]"></div>
            </div>
        </div>
    </div>
    <div class="ultima">
        <div class="dias-de-entrega">
            <div class="form-group">
                <label>Dias de entrega:</label>
                <select class="pdm-select" ng-model="assinatura.dias_de_entrega" ng-options="value as label for (value, label) in franquia.opcoes_dias_de_entrega"></select>
            </div>
        </div>
        <div class="eu-quero">
            <div class="resumo">
                <p>
                    Na<span ng-if="keys(assinatura.quantidades).length != 1">s</span> quantidade<span ng-if="keys(assinatura.quantidades).length != 1">s</span> selecionada<span ng-if="keys(assinatura.quantidades).length != 1">s</span>,<br>
                    <b ng-bind="franquia.opcoes_dias_de_entrega[assinatura.dias_de_entrega]"></b>,<br>
                    sua assinatura mensal será de:
                </p>
                <p class="valor"><span class="oportunidade">R$<b ng-bind="assinatura.valor | currency:''">??,00</b></span> mensais</p>
            </div>
            <input class="botao-eu-quero" type="submit" value="" title="Eu Quero" ng-click="cadastrar()">
        </div>
    </div>
</article>

<article id="cadastre" ng-controller="cadastreController" ng-class="{wait: carregando}" class="hidden">
    <form id="signup" name="signupForm" class="profile" ng-class="{submitted: signupForm.submitted}" novalidate>
        {{ Form::token() }}
        <h2>Pré Cadastro</h2>
        <p class="subheader">Preencha corretamente nosso pré-cadastro, que em breve entraremos em contato para formalizar sua assinatura.</p>
        <div class="esquerda">
            <p>
                <label for="cidade">Cidade:</label><br />
                <input id="cidade" name="cidade" type="text" ng-model="franquias[assinante.assinatura.id_franquia].cidade" readonly />
            </p>
            <p>
                <label>Como nos conheceu:</label><br />
                <select class="pdm-select" name="conheceu" ng-model="assinante.extra.conheceu" ng-options="value as label for (value, label) in opcoes.conheceu" ></select>
            </p>
            <p>
                <label>Onde será a entrega:</label><br />
                <select class="pdm-select" name="tipo" ng-model="assinante.extra.tipo" ng-options="value as item.text for (value, item) in opcoes.tipo"></select>
            </p>
            <p>
                <label for="local" ng-bind="opcoes.tipo[assinante.extra.tipo].label">Nome do condomínio:</label><br />
                <input id="local" name="local" type="text" ng-model="assinante.extra.local" maxlength="255" />
            </p>
            <p>
                <label for="cep">Digite o CEP:</label><br />
                <input id="cep" name="cep" type="text" ng-model="assinante.endereco.cep" ng-pattern="assinante.endereco.validation.cep" required placeholder="CEP do local de entrega" maxlength="9" />
            </p>
        </div>
        <div class="centro">
            <p>
                <label for="nome">Nome:</label><br />
                <input id="nome" name="nome" type="text" ng-model="assinante.nome" ng-minlength="4" required placeholder="Digite seu nome completo" maxlength="255" />
            </p>
            <p>
                <label for="logradouro">Endereço:</label><br />
                <input id="logradouro" name="logradouro" type="text" ng-model="assinante.endereco.logradouro" required maxlength="255" />
            </p>
            <p>
                <label for="numero">Número:</label><br />
                <input id="numero" name="numero" type="text" ng-model="assinante.endereco.numero" required placeholder="Número do endereço" maxlength="108" />
            </p>
            <p>
                <label for="complemento">Complemento:</label><br />
                <input id="complemento" name="complemento" type="text" ng-model="assinante.endereco.complemento" maxlength="108" />
            </p>
            <p>
                <label for="bairro">Bairro:</label><br />
                <input id="bairro" name="bairro" type="text" ng-model="assinante.endereco.bairro" required maxlength="108" />
            </p>
        </div>
        <div class="direita">
            <p>
                <label for="telefone">Telefone:</label><br />
                <input id="telefone" name="telefone" type="text" ng-model="assinante.telefone" ng-pattern="assinante.validation.telefone" placeholder="Digite um telefone para contato" required maxlength="15" />
            </p>
            <h2>Dados de Acesso</h2>
            <p class="subheader">Dados para acesso ao nosso sistema.</p>
            <p>
                <label for="email">E-mail:</label><br />
                <input id="email" name="email" type="email" ng-model="assinante.email" required placeholder="Digite seu e-mail" maxlength="255" />
            </p>
            <p>
                <label for="senha">Digite sua senha:</label><br />
                <input id="senha" name="senha" type="password" ng-model="assinante.senha" ng-minlength="5" required placeholder="Digite sua senha" />
            </p>
            <p class="enviar"><input type="submit" value="" title="Enviar Cadastro" ng-click="confirmarCadastro()" /></p>
        </div>
        <p class="clearfix"></p>
        <table class="table table-condensed">
            <thead>
                <tr><th>Assinatura</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>@{{ franquias[assinante.assinatura.id_franquia].cidade }} (Padaria @{{ franquias[assinante.assinatura.id_franquia].nome }})</td>
                </tr>
                <tr>
                    <td>Entrega: @{{ franquias[assinante.assinatura.id_franquia].opcoes_dias_de_entrega[assinante.assinatura.dias_de_entrega] }}</td>
                </tr>
                <tr ng-repeat="(id_produto, quantidade) in assinante.assinatura.quantidades" ng-if="quantidade > 0">
                    <td>@{{ franquias[assinante.assinatura.id_franquia].produtos[id_produto].nome }}: @{{ quantidade }} unidade@{{ quantidade == 1 ? '' : 's' }}</td>
                </tr>
                <tr>
                    <td>
                        Total mensal: R$@{{ assinante.assinatura.valor | currency:'' }}
                        <button class="btn btn-xs pull-right" ng-click="voltar()">Alterar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</article>

<script id="confirmar-cadastro.html" type="text/ng-template">
    <div class="modal-header">
        <h3>Confirmar Cadastro</h3>
    </div>
    <div class="modal-body">
        <p>
            Você preencheu <b>@{{ assinante.email }}</b> como e-mail.<br />
            Ele será utilizado juntamente com sua senha para entrar em nosso sistema.
        </p>
        <p>Ao confirmar você será levado para o Painel do Assinante.</p>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$close()">Confirmar</button>
        <button class="btn btn-warning" ng-click="$dismiss()">Voltar e Corrigir</button>
    </div>
</script>

<script id="cadastro-falhou.html" type="text/ng-template">
    <div class="modal-header">
        <h3>Falha no Cadastro</h3>
    </div>
    <div class="modal-body">
        <p ng-if="cadastroErro">
            Houve um problema no processamento do seu cadastro:<br />
            <strong>@{{ cadastroErro }}</strong><br />
            Por favor, tente corrigir e enviar novamente.
        </p>
        <p ng-if="!cadastroErro">
            Houve algum problema inesperado no processamento do seu cadastro.<br />
            Por favor, tente novamente.
        </p>
        <p>Se o problema persistir, solicitamos que <a href="/contato">entre em contato conosco</a>.</p>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$dismiss()">Ok</button>
    </div>
</script>
@stop
