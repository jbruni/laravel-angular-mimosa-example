@extends('layouts.master')

@section('styles')
        <link rel="stylesheet" href="{{ URL::asset(($production ? 'dist' : 'app') . '/como-funciona/como-funciona.css') }}">
@stop

@section('content')
<div id="como-funciona">
    <div class="header">
        <h1 class="sr-only">Como Funciona</h1>
    </div>
    <div class="diagrama"></div>
    <p>
        <span class="sr-only">Escolha quantos pães deseja receber:</span>
        Você poderá alterar a quantidade em
        uma data específica ou mesmo alterar
        sua assinatura com facilidade.
    </p>
    <p>
        <span class="sr-only">Defina a faixa de horário para a entrega:</span>
        Para sua comodidade, você poderá 
        definir uma faixa de horário para 
        receber seus pãezinhos. 
    </p>
    <p>
        <span class="sr-only">Escolha os dias que deseja receber e pronto:</span>
        São várias opções que se adequam ao 
        seu dia-a-dia, e caso precise, poderá
        pausar as entregas.
    </p>
</div>
@stop
