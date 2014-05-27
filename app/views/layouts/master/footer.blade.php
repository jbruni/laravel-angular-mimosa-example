<!-- layouts.master.footer -->
        <div id="footer">
            <p class="copyright">
                &copy; 2013 Todos os direitos reservados.<br />
                Powered by Pão da Manhã.
            </p>
            <hr />
            <p class="links">
                <a href="{{ URL::action('AuthController@signup') }}">Assine Já!</a>
                <a href="{{ URL::action('GuestController@franqueado') }}">Seja um Franqueado</a>
                <a href="{{ URL::action('AuthController@forgotPassword') }}">Recuperar Senha</a>
            </p>
            <p class="social">
                <a class="facebook" href="https://www.facebook.com/paodamanha" title="Pão da Manhã no Facebook"></a>
            </p>
        </div>
<!-- /layouts.master.footer -->