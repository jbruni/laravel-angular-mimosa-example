<!-- auth.login-form -->
                            <form method="POST" accept-charset="UTF-8" id="login-form" 
                                  action="{{ URL::to($app->request->is('franquia*') ? '/franquia' : '/minha-conta') }}"
                                  style="display: {{ !empty($mostra_login) || Session::get('mostra_login') ? 'block' : 'none' }}" 
                                  class="minha-conta{{ $errors->any() ? ' erro' : '' }}">
                                {{ Form::token() }} 
                                <p>
                                    <input type="text" id="email" name="email" class="email" placeholder="E-mail" value="{{{ Input::old('email') }}}" />
                                </p>
                                <p>
                                    <input type="password" id="senha" name="senha" class="senha" placeholder="Senha" value="{{{ Input::old('senha') }}}" />
                                    <input type="submit" value="" />
                                </p>
                                <p class="esqueci"><a href="{{ URL::action('AuthController@forgotPassword') }}">Esqueci minha senha</a></p>
                            </form>
<!-- /auth.login-form -->
