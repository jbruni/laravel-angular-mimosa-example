@extends('layouts.master')

@section('content')
<article id="duvidas" data-ng-controller="duvidasController">
    <div class="row">
        <div class="header col-md-10 col-md-offset-1">
            <h1 class="sr-only">Dúvidas Frequentes</h1>
        </div>
    </div>
    <div class="row duvida" ng-repeat="item in duvidas" ng-init="mostrando = false">
        <div class="col-md-10 col-md-offset-1">
            <p class="pergunta" ng-click="mostrando = !mostrando">
                <span class="setinha" ng-class="{ativa: mostrando}"></span>
                <span ng-bind="item.pergunta"></span>
            </p>
            <p class="resposta" ng-show="mostrando" ng-bind-html="item.resposta"></p>
        </div>
    </div>
</div>
@stop
