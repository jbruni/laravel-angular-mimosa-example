@extends('layouts.master')

@section('styles')
        <link rel="stylesheet" href="{{ URL::asset(($production ? 'dist' : 'app') . '/directives/pdm-directives.css') }}">
@stop

@section('content')
<article id="contato" data-ng-controller="contatoController" data-ng-class="{wait: enviando}">
    <div class="row">
        <div class="header">
            <h1 class="sr-only">Contato</h1>
        </div>
    </div>
    <form name="contatoForm" data-ng-class="{submitted: contatoForm.submitted}" class="row" novalidate>
        <div class="dados col-md-4">
            <p>
                <label>Nome:</label><br />
                <input type="text" name="nome" placeholder="Digite seu nome completo" data-ng-model="contato.nome" data-ng-required="contatoForm.mensagem.$valid" />
            </p>
            <p>
                <label>Telefone:</label><br />
                <input type="text" name="telefone" placeholder="Digite seu telefone" data-ng-model="contato.telefone" />
            </p>
            <p>
                <label>E-mail:</label><br />
                <input type="email" name="email" placeholder="Digite seu e-mail" data-ng-model="contato.email" data-ng-required="contatoForm.mensagem.$valid" />
            </p>
        </div>
        <div class="mensagem col-md-5">
            <p>
                <label>Mensagem:</label><br />
                <textarea name="mensagem" data-ng-model="contato.mensagem" required></textarea>
            </p>
        </div>
        <div class="envio col-md-3">
            <p class="destino">
                <label>Enviar para:</label><br />
                <select class="pdm-select" name="destino" data-ng-model="contato.destino" data-ng-options="value as label for (value, label) in destinatarios" data-ng-required="contatoForm.mensagem.$valid">
                    <option value="">Selecione o destinatário</option>
                </select>
            </p>
            <p class="enviar">
                <input type="submit" value="" title="Enviar Contato" data-ng-click="enviarMensagem()" />
            </p>
        </div>
    </form>
</article>
@stop
