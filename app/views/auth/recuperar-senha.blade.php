@extends('layouts.master')

@section('content')
                <div id="message" style="max-width: 396px">
                    <h1>Recuperar Senha</h1>
                    <p>Digite abaixo sua nova senha e confirme.<br />Lembre-se de anotá-la em um local seguro.</p>
                    <div class="row">
                        <form method="POST" accept-charset="UTF-8" method="POST" action="{{ Request::fullURL() }}" class="form-group col-md-10 col-md-offset-1">
                            {{ Form::token() }} 
                            <input type="hidden" name="token" value="{{{ Session::get('rp_token') }}}">
                            <p><input id="senha-nova" name="senha" type="password" value="{{{ Input::old('senha') }}}" class="form-control" placeholder="Nova Senha"></p>
                            <p><input id="confirma-senha-nova" name="confirma-senha" type="password" value="{{{ Input::old('confirma-senha') }}}" class="form-control" placeholder="Repita a Senha"></p>
                            <p><input  class="btn btn-primary pull-right" type="submit" value="Alterar Senha"></p>
                        </form>
                    </div>
                </div>
@stop
