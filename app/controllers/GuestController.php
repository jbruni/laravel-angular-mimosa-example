<?php

class GuestController extends Controller {

	public function index()
	{
		return View::make('homepage', array('main' => 'homepage'));
	}

	public function comoFunciona()
	{
		return View::make('como-funciona', array('title' => 'Como Funciona'));
	}

	public function duvidas()
	{
		return View::make('duvidas', array('title' => 'Dúvidas', 'main' => 'duvidas'));
	}

	public function contato()
	{
		return View::make('contato', array('title' => 'Contato', 'main' => 'contato'));
	}

	public function franqueado()
	{
		return View::make('seja-um-franqueado', array('title' => 'Seja um Franqueado'));
	}

	/*** REST ***/

	public function getContatos()
	{
		return with(new \Business\Email)->getPublicEmail();
	}

	public function postContato()
	{
		with(new \Business\Email)->enviarContato(Input::all());
	}

	public function getFranquias()
	{
		return dictionary(Franquia::ativas(), 'toGuestArray');
	}

	public function getExtras()
	{
		return Extra::$opcoes;
	}

	/*** BOLETO ***/

	public function getBoleto($token)
	{
		return with(new \Business\Pagamento\Boleto)->mostrarParaFatura($token);
	}

}
