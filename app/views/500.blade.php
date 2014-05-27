@extends('layouts.master')

@section('content')
                <div id="message">
                    <h1>Erro no servidor...</h1>
                    <p class="description">HTTP 500</p>
                    <p>Houve um problema interno no servidor para gerar a página que você solicitou. Se o problema persistir, por favor entre em contato com o suporte em <a href="mailto:{{ Config::get('business.support_email') }}">{{ Config::get('business.support_email') }}</a>.</p>
                    <p><a href="{{ URL::route('home') }}" class="btn btn-default btn-lg" title="Voltar para a Página Inicial">Voltar para a Página Inicial</a></p>
                </div>
@stop
