@extends('layouts.master')

@section('top')
        <div id="background-holder">
            <img src="{{ URL::asset(($production ? 'dist' : 'app') . '/homepage/background.jpg') }}" style="display: none">
        </div>

        <div id="homepage">
            <h1 class="sr-only">Pão da Manhã</h1>
            <h2>O Seu café da manhã mudou para melhor!</h2>
            <h3>Assine e receba pães fresquinhos todos os dias, ou ligue e peça nosso delivery.</h3>
            <a id="assine" href="{{ URL::action('AuthController@signup') }}" style="z-index: 9000">
                <span class="sr-only">Assine já!</span>
                <img src="{{ URL::asset(($production ? 'dist' : 'app') . '/homepage/assine_ja_button.png') }}">
            </a>
        </div>
@stop
