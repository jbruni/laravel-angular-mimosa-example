@extends('layouts.master')

@section('content')
            <div id="message">
                <h1>Seja um Franqueado</h1>
                <p class="description">Leve esta novidade para sua cidade, seja um franqueado <span>Pão da Manhã</span>.</p>
                <p>Para maiores informações, envie um e-mail para <a href="mailto:{{ Config::get('business.sales_email') }}">{{ Config::get('business.sales_email') }}</a>
            </div>
@stop
