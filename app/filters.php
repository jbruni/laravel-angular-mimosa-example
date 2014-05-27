<?php

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/

App::before(function($request)
{
	newrelic('set_appname', Config::get('business.site_name'), Config::get('business.newrelic_key'));
	newrelic('disable_autorum');

	$user_class = $request->is('franquia*') ? 'Franquia' : 'Assinante';

	Config::set('larauth::db_password', 'senha');
	Config::set('larauth::user_class', $user_class);
	Config::set('larauth::cookie', array_replace(Config::get('larauth::cookie'), array('name' => 'pdm' . $user_class)));

	Session::put('request', Carbon::now() . '');

	$user = Larauth::user();
	if (empty($user)) { $user = new $user_class; }

	App::instance('user', $user);
	View::share('user', $user);

	if (in_array(Input::get('_method') , array('PUT', 'DELETE')))
	{
		Request::setMethod(Input::get('_method'));   // spoof HTTP verbs
	}
});

App::after(function($request, $response)
{
	if (Request::ajax())
	{
		$response->header('Cache-Control', 'no-store');
	}
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application.
|
*/

Route::filter('auth.assinante', function()
{
	if (empty(App::make('user')->id_assinante)) return Redirect::guest('/minha-conta');
});

Route::filter('auth.franquia', function()
{
	if (empty(App::make('user')->id_franquia)) return Redirect::guest('/franquia/login');
});

/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function()
{
	if (!empty(App::make('user')->id_assinante)) return Request::ajax() ? '' : Redirect::to('/minha-conta/admin');
	if (!empty(App::make('user')->id_franquia)) return Request::ajax() ? '' : Redirect::to('/franquia/admin');
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function()
{
	if (Session::token() != Input::get('_token'))
	{
		throw new Illuminate\Session\TokenMismatchException;
	}
});
