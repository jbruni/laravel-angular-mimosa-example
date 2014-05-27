@extends('layouts.master')

@section('content')
                <div id="message">
                    <h1>Acesso proibido...</h1>
                    <p class="description">HTTP 403</p>
                    <p>O acesso à página que você solicitou não foi permitido. Se precisar de ajuda, por favor entre em contato com o suporte em <a href="mailto:{{ Config::get('business.support_email') }}">{{ Config::get('business.support_email') }}</a></p>
                    <p><a href="{{ URL::route('home') }}" class="btn btn-default btn-lg" title="Voltar para a Página Inicial">Voltar para a Página Inicial</a></p>
                </div>
@stop
