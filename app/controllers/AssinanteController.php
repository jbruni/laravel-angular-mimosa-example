<?php

class AssinanteController extends Controller {

	public $user;

	public function __construct()
	{
		$this->beforeFilter('auth.assinante');
		$this->beforeFilter('csrf', array('on' => 'post'));

		$this->user = App::make('user');

		newrelic('add_custom_parameter', 'assinante_id',       $this->user->id_assinante);
		newrelic('add_custom_parameter', 'assinante_nome',     $this->user->nome        );
		newrelic('add_custom_parameter', 'assinante_email',    $this->user->email       );
		newrelic('add_custom_parameter', 'assinante_franquia', $this->user->id_franquia );
	}

	public function getAdmin()
	{
		return View::make('minha-conta', array('title' => 'Minha Conta', 'main' => 'minha-conta'));
	}


	/*** ASSINATURA ***/

	public function getFranquia()
	{
		return $this->user->franquia->toGuestArray();
	}

	public function getConfiguracao()
	{
		return $this->user->configuracao->toAdminArray();
	}

	public function postAtivarAssinatura()
	{
		with(new Business\Assinatura\Ativar)->ativaAssinatura($this->user);

		return array('sucesso' => true);
	}

	public function postDesativarAssinatura()
	{
		$desativacao = with(new Business\Assinatura\Desativar);

		$desativacao->desativaAssinatura($this->user);

		return array(
			'sucesso'  => true,
			'mensagem' => $desativacao->mensagem,
			'fatura'   => $desativacao->gerouFatura,
		);
	}

	public function postPausarAssinatura()
	{
		$data_pausado_ate = substr(Input::get('data_pausado_ate'), 0, 10);

		$pausamento = with(new Business\Assinatura\Pausar)->pausaAssinatura($this->user, $data_pausado_ate);

		return array(
			'sucesso'  => true,
			'mensagem' => $pausamento->mensagem,
		);
	}

	public function postDespausarAssinatura()
	{
		$despausamento = with(new Business\Assinatura\Despausar)->despausaAssinatura($this->user);

		return array(
			'sucesso'  => true,
			'mensagem' => $despausamento->mensagem,
		);
	}

	public function postAlterarAssinatura()
	{
		$alteracao = with(new Business\Assinatura\Alterar)->alteraAssinatura($this->user, Input::all());

		return array(
			'sucesso'  => true,
			'mensagem' => $alteracao->mensagem,
		);
	}


	/*** LOJA ***/

	/*
	 * Para sincronizar com o relógio do servidor
	 */
	public function getTime()
	{
		return time() * 1000;
	}

	public function getCategorias()
	{
		return $this->user->franquia->categorias;
	}

	public function getProdutos()
	{
		return $this->user->franquia->produtos()->ativos()->get();
	}

	public function getPedidos()
	{
		return $this->user->pedidosConfirmados()->get();
	}

	public function putPedidos()
	{
		return $this->user->novoPedido(Input::get('data'), Input::get('itens'), Input::get('total'));
	}

	public function deletePedidos()
	{
		return $this->user->cancelarPedido(Input::get('id_pedido'));
	}


	/*** HISTÓRICO ***/

	public function getFaturas()
	{
		return with(new Business\Fatura\Historico)->obterDoAssinante($this->user);
	}


	/*** MEUS DADOS ***/

	public function getMeusDados()
	{
		return $this->user->toMeusDadosArray();
	}

	public function postAtualizar()
	{
		$atualizacao = new Business\Assinante\AlteraCadastro;

		if (!$atualizacao->alterarCadastro($this->user, Input::all()))
		{
			return App::abort(500);
		}

		// No caso de ter alterado a senha
		Larauth::loginUser($this->user->email);

		return array('sucesso' => true);
	}

}
