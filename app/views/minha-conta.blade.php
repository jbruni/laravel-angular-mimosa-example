@extends('layouts.master')

@section('styles')
        <link rel="stylesheet" href="{{ URL::asset(($production ? 'dist' : 'app') . '/directives/pdm-directives.css') }}">
@stop

@section('scripts')
    @if ($production) 
        <script src="{{ URL::asset('dist/minha-conta/templates.js') }}"></script>
    @endif 
@stop

@section('content')
<div class="admin" ng-controller="mcController">

    <div class="header">
        <h1 ng-bind="route.header"></h1>
        <ul class="nav2">
@if ($user->aguardando == 'N') 
            <li><a href="#/assinatura" ng-class="{selected: route.name == 'assinatura'}">Assinatura</a> | </li>
@endif 
            <li><a href="#/loja" ng-class="{selected: route.name == 'loja'}">Loja de Conveniência</a> | </li>
            <li><a href="#/historico" ng-class="{selected: route.name == 'historico'}">Histórico</a> | </li>
            <li><a href="#/profile" ng-class="{selected: route.name == 'profile'}">Meus Dados</a></li>
        </ul>
    </div>

    <div class="dashboard clearfix @{{ route.name }}">
        <div ng-view="" class="slide animation"></div>
    </div>

    {{ Form::token() }}

</div>
@stop
