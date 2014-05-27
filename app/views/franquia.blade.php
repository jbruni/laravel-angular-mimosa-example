@extends('layouts.master')

@section('styles')
        <link rel="stylesheet" href="{{ URL::asset(($production ? 'dist' : 'app') . '/directives/pdm-directives.css') }}">
@stop

@section('scripts')
    @if ($production) 
        <script src="{{ URL::asset('dist/franquia/templates.js') }}"></script>
    @endif 
@stop

@section('content')
<div class="admin" ng-controller="franquiaController">

    <div class="header">
        <h1 ng-bind="route.header"></h1>
        <ul class="nav2">
            <li><a href="#/contrato" ng-class="{selected: route.name == 'contrato'}">Configurações</a> | </li>
            <li><a href="#/financeiro" ng-class="{selected: route.name == 'financeiro'}">Financeiro</a> | </li>
            <li><a href="#/produtos" ng-class="{selected: route.name == 'produtos'}">Produtos</a> | </li>
            <li><a href="#/assinantes" ng-class="{selected: route.name == 'assinantes'}">Assinantes</a> | </li>
            <li><a href="#/entrega" ng-class="{selected: route.name == 'entrega'}">Lista de Entrega</a></li>
        </ul>
    </div>

    <div class="dashboard clearfix @{{ route.name }}">
        <div ng-view="" class="slide animation"></div>
    </div>

    {{ Form::token() }}

</div>
@stop
