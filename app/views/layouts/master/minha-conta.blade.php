<!-- layouts.master.minha-conta -->
@if(!empty($user->id_assinante))
                            <div class="minha-conta">
                                Olá {{{ strtok(ltrim($user->nome), ' ') }}}<br />
                                &bull; <a href="{{ URL::to('/minha-conta') }}">Minha Conta</a><br />
                                &bull; <a href="{{ URL::to('/minha-conta/logout') }}">Logout</a>
                            </div>
@elseif(!empty($user->id_franquia))
                            <div class="minha-conta">
                                {{{ strtok(ltrim($user->nome), ' ') }}}<br />
                                &bull; <a href="{{ URL::to('/franquia/admin') }}">Franquia</a><br />
                                &bull; <a href="{{ URL::to('/franquia/logout') }}">Logout</a>
                            </div>
@else
                            <a class="minha-conta" href="{{ URL::to('/minha-conta') }}" title="Minha Conta"></a>
@include('auth.login-form') 
@endif
<!-- /layouts.master.minha-conta -->