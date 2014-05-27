<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
*/

/*** PATTERNS ***/
Route::pattern('code', '(.*)');

/*** PUBLIC SITE ***/
Route::group(array(), function()
{
	Route::get('/', array('uses' => 'GuestController@index', 'as' => 'home' ));
	Route::get('/como-funciona',    'GuestController@comoFunciona'           );
	Route::get('/duvidas',          'GuestController@duvidas'                );
	Route::get('/contato',          'GuestController@contato'                );
	Route::get('/franqueado',       'GuestController@franqueado'             );
});
Route::group(array(), function()
{
	Route::get( '/contatos',        'GuestController@getContatos'            );
	Route::post('/contato',         'GuestController@postContato'            );
	Route::get( '/franquias',       'GuestController@getFranquias'           );
	Route::get( '/extras',          'GuestController@getExtras'              );
});

/*** AUTHENTICATION ***/
Route::group(array('before' => 'guest'), function()
{
	Route::get( '/assine',                 'AuthController@signup'               );
	Route::post('/assine',                 'AuthController@signupHandler'        );
	Route::get( '/minha-conta',            'AuthController@login'                );
	Route::post('/minha-conta',            'AuthController@loginHandler'         );
	Route::get( '/franquia',               'AuthController@login'                );
	Route::post('/franquia',               'AuthController@loginHandler'         );
});
Route::group(array(), function()
{
	Route::any( '/minha-conta/logout',     'AuthController@logout'               );
	Route::any( '/franquia/logout',        'AuthController@logout'               );
	Route::any( '/confirmar/{code}',       'AuthController@verify'               );
	Route::get( '/esqueci-senha',          'AuthController@forgotPassword'       );
	Route::post('/esqueci-senha',          'AuthController@forgotPasswordHandler');
	Route::any( '/recuperar-senha/{code}', 'AuthController@resetPassword'        );
});

/*** "LOGGED-IN USER" SITE  ***/
Route::controller('minha-conta', 'AssinanteController');
Route::controller('franquia',    'FranquiaController' );

/*** EXTRA ROUTES ***/
Route::get('/boleto/{code}', 'GuestController@getBoleto');

/*** ERROR ROUTES ***/
Route::group(array(), function()
{
	// Use these routes while in local/development environment to see
	// how these error pages will look like in the production environment

	Route::get('/401', function()
	{
		return Response::view('401', array('code' => 401), 401);
	});

	Route::get('/403', function()
	{
		return Response::view('403', array('code' => 403), 403);
	});

	Route::get('/404', function()
	{
		return Response::view('404', array('code' => 404), 404);
	});

	Route::get('/500', function()
	{
		return Response::view('500', array('error' => 'Erro desconhecido', 'code' => 500), 500);
	});

	Route::get('/503', function()
	{
		return Response::view('503', array('code' => 503), 503);
	});
});
