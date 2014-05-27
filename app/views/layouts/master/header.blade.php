<!-- layouts.master.header -->
                <div class="pdm-menu">
                    <ul class="pdm-menu">
                        <li><a class="home" href="{{ URL::route('home') }}" title="Home"></a></li>
                        <li><a class="como-funciona" href="{{ URL::action('GuestController@comoFunciona') }}" title="Como Funciona"></a></li>
                        <li><a class="assine" href="{{ URL::action('AuthController@signup') }}" title="Assine"></a></li>
                        <li class="logo"><a href="{{ URL::route('home') }}"></a></li>
                        <li><a class="duvidas" href="{{ URL::action('GuestController@duvidas') }}" title="Dúvidas"></a></li>
                        <li><a class="contato" href="{{ URL::action('GuestController@contato') }}" title="Contato"></a></li>
                        <li id="show-login">
@include('layouts.master.minha-conta') 
                        </li>
                    </ul>
                </div>
<!-- /layouts.master.header -->