@extends('layouts.master')

@section('content')
                <div id="message">
                    <h1>Acesso restrito...</h1>
                    <p class="description">HTTP 401</p>
                    <p>A página que você solicitou requer autenticação, ou você não tem permissão para acessá-la. Se o problema persistir, por favor entre em contato com o suporte em <a href="mailto:{{ Config::get('business.support_email') }}">{{ Config::get('business.support_email') }}</a></p>
                    <p><a href="{{ URL::route('home') }}" class="btn btn-default btn-lg" title="Voltar para a Página Inicial">Voltar para a Página Inicial</a></p>
                </div>
@stop
