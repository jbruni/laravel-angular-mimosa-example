<?php

use Illuminate\Support\MessageBag;

class AuthController extends Controller {

	public function __construct()
	{
		$this->beforeFilter('csrf', array('on' => 'post'));
	}

	public function login()
	{
		return View::make('homepage', array('title' => 'Login', 'main' => 'homepage', 'mostra_login' => true));
	}

	public function loginHandler()
	{
		// Retrieve input
		$email = Input::get('email');
		$senha = Input::get('senha');

		$auth = new Business\Login;

		// Verify credentials and perform login
		if (!$auth->login($email, $senha))
		{
			// If failed, redirect informing the error
			return Redirect::to(URL::previous())
			       ->with('errors', $auth->loginErrors)
			       ->with('mostra_login', true)
			       ->withInput();
		}

		// If successful, redirect to intended page or dashboard
		return Redirect::intended('/' . (Larauth::user()->type() == 'Franquia' ? 'franquia' : 'minha-conta') . '/admin');
	}

	public function logout()
	{
		$user = App::make('user');

		if ($user)
		{
			Log::info('Logout de ' . Config::get('larauth::user_class') . ' bem-sucedido: ' . $user->email);
		}

		Larauth::logout();

		return Redirect::route('home');
	}

	public function signup()
	{
		return View::make('assine', array('title' => 'Assine', 'main' => 'assine'));
	}

	public function signupHandler()
	{
		$signup = new Business\Assinante\SignUp;

		// Validate and register a new user
		if (!$signup->register(Input::all()))
		{
			// If failed, return HTTP error code 500
			return App::abort(500);
		}

		// If successful, send mail, do login and redirect to dashboard
		with(new Business\Email)->send('verify_email', $signup->assinante);

		Larauth::loginUser($signup->assinante->email);

		Session::flash('success', 'Bem-vindo! Enviamos um e-mail para você com um link para confirmar seu cadastro. Por favor, acesse o link para habilitar sua conta. Obrigado.');

		return array('success' => true);
	}

	public function verify($code)
	{
		if (!Business\Security::checkUserSecretCode($code, $user, 'verify_email'))
		{
			return Redirect::route('home')->with('danger', 'Link de confirmação expirado ou inválido.');
		}

		Business\Security::userSuccessfullyVerified($user);

		Larauth::loginUser($user->email);

		return Redirect::action('AssinanteController@getAdmin')
		->with('success', 'O seu endereço de e-mail foi confirmado com sucesso. Obrigado.');
	}

	public function forgotPassword()
	{
		return View::make('auth.esqueci-senha');
	}

	public function forgotPasswordHandler()
	{
		$email = strtolower(trim(Input::get('email')));
		$assinante = Assinante::whereEmail($email)->first();

		if (!$assinante)
		{
			return Redirect::action('AuthController@forgotPassword')
			->with('danger', 'Assinante não encontrado.')
			->withInput();
		}

		with(new Business\Email)->send('forgot_password', $assinante);

		$expires = Config::get('business.forgot_password_expires');

		return Redirect::action('AuthController@forgotPassword')
		->with('success', 'Enviamos um e-mail com um link para redefinir sua senha. <strong>Ele vale por ' . $expires . ' minutos.</strong> Por favor, utilize-o antes de expirar. Obrigado.');
	}

	public function resetPassword($code)
	{
		if (!Business\Security::checkUserSecretCode($code, $user, 'forgot_password'))
		{
			return Redirect::route('home')->with('danger', 'Link de recuperação de senha expirado ou inválido.');
		}

		if (Request::getMethod() == 'POST')
		{
			$input = array_filled(Input::all(), array('token', 'senha', 'confirma-senha'));

			$token = Session::get('rp_token');
			Session::forget('rp_token');

			$result = Business\Security::changePassword($user, $token, $input);

			if ($result === true)
			{
				Larauth::loginUser($user->email);

				return Redirect::action('AssinanteController@getAdmin')
				->with('success', 'Sua nova senha foi salva. Você já está logado.');
			}

			return Redirect::to(Request::fullURL())->with('danger', $result)->withInput();
		}

		$token = Larauth::randomPassword(64, false);
		Session::put('rp_token', $token);

		return View::make('auth.recuperar-senha', array(
			'title'  => 'Recuperar Senha',
			'token'  => $token,
		));
	}

}
