@extends('layouts.master')

@section('content')
                <div id="message">
                    <h1>Recuperar Senha</h1>
                    <p>Digite o endereço de e-mail que usou quando se cadastrou no Pão da Manhã.</p>
                    <p>Enviaremos um link para que você possa redefinir sua senha.</p>
                    <form method="POST" accept-charset="UTF-8" method="POST" action="{{ URL::action('AuthController@forgotPasswordHandler') }}" class="row">
                        {{ Form::token() }} 
                        <p class="form-group col-md-6">
                            <input class="form-control" type="text" name="email" value="{{{ Input::old('email') }}}" placeholder="E-mail">
                        </p>
                        <p class="form-group col-md-5 col-md-offset-1">
                            <input  class="btn btn-primary pull-left" type="submit" value="Recuperar Senha">
                            <a class="btn btn-default pull-right" href="javascript: history.go(-1)">Voltar</a>
                        </p>
                    </form>
                </div>
@stop
