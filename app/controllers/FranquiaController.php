<?php

class FranquiaController extends Controller {

	public $user;

	public function __construct()
	{
		$this->beforeFilter('auth.franquia');
		$this->beforeFilter('csrf', array('on' => 'post', 'except' => array(
			'putCategorias', 'deleteCategorias', 'putProdutos', 'postProdutos', 'deleteProdutos',
			'postImagemProduto', 'postPrecosProduto', 'putProdutoCategoria', 'deleteProdutoCategoria',
		)));

		$this->user = App::make('user');

		newrelic('add_custom_parameter', 'franquia_id',    $this->user->id_franquia);
		newrelic('add_custom_parameter', 'franquia_email', $this->user->email      );
	}

	public function getAdmin()
	{
		return View::make('franquia', array('title' => 'Franquia', 'main' => 'franquia'));
	}

	/*** CONFIGURAÇÕES DA FRANQUIA ***/

	public function getContrato()
	{
		return $this->user->contrato->toAdminArray();
	}

	public function postAlterarContrato()
	{
		$alteracao = with(new Business\Contrato\Alterar)->alteraContrato($this->user, Input::all());

		return array('sucesso' => true, 'mensagem' => $alteracao->mensagem);
	}

	/*** FINANCEIRO ***/

	public function postFaturas()
	{
		return with(new Business\Fatura\Historico)->obterDaFranquia($this->user, Input::get('periodo'));
	}

	public function postFaturasResumo()
	{
		return with(new Business\Fatura\Historico)->obterResumoDaFranquia($this->user, Input::get('periodo'));
	}

	public function postFatura()
	{
		return with(new Business\Fatura\Historico)->obterFaturaDaFranquia($this->user, Input::get('id_fatura'));
	}

	public function postEditarFatura()
	{
		return with(new Business\Fatura\Atualizar)->alterar($this->user, Input::all());
	}

	public function postQuitarFatura()
	{
		return with(new Business\Fatura\Atualizar)->quitar($this->user, Input::get('id_fatura'));
	}


	/*** CATEGORIAS ***/

	public function getCategorias()
	{
		return $this->user->categorias;
	}

	public function putCategorias()
	{
		return $this->user->novaCategoria(Input::get('nome'));
	}

	public function deleteCategorias()
	{
		$categoria = Categoria::find(Input::get('id_categoria'));

		if ($categoria->id_franquia == $this->user->id_franquia)
		{
			$categoria->delete();
		}
	}

	/*** PRODUTOS ***/

	public function getProdutos()
	{
		return $this->user->produtos()->with('precos')->get();
	}

	public function putProdutos()
	{
		return $this->user->novoProduto(Input::get('produto'), Input::get('id_categoria'));
	}

	public function postProdutos()
	{
		$produto = $this->user->produtos->find(Input::get('id_produto'));
		$produto->forceEntityHydrationFromInput = true;
		$produto->save();
	}

	public function deleteProdutos()
	{
		$this->user->produtos->find(Input::get('id_produto'))->delete();
	}

	public function postImagemProduto()
	{
		$produto = $this->user->produtos->find(Input::get('id_produto'));

		if (!$produto || !Input::hasFile('imagem')) return;

		Input::file('imagem')->move($produto->imagePath(), $produto->imageFilename());

		return '{"resultado": "Arquivo enviado com sucesso."}';
	}

	public function postPrecosProduto()
	{
		$produto = $this->user->produtos->find(Input::get('id_produto'));

		if (!$produto) return;

		return $produto->setFaixasDePreco(Input::get('precos'));
	}

	/*** PRODUTOS E CATEGORIAS ***/

	public function putProdutoCategoria()
	{
		return $this->user->incluiProdutoNaCategoria(Input::get('id_produto'), Input::get('id_categoria'));
	}

	public function deleteProdutoCategoria()
	{
		return $this->user->excluiProdutoDaCategoria(Input::get('id_produto'), Input::get('id_categoria'));
	}


	/*** ASSINANTES ***/

	public function getAssinantes()
	{
		return with(new Business\Franquia\ListaDeAssinantes($this->user))->obterLista();
	}

	public function postAlterarStatus()
	{
		return with(new Business\Assinante\AlteraStatus)->alterarStatus($this->user, Input::all());
	}

	/*** LISTA DE ENTREGA ***/

	public function getEntregadores()
	{
		return $this->user->entregadores()->lists('nome', 'id_entregador');
	}

	public function postEntregas()
	{
		return with(new Business\Entregas\ListaDeEntrega($this->user, Input::get('data')))->obterLista();
	}

	public function postOrdenaLista()
	{
		return with(new Business\Entregas\Ordenacao)->salvarOrdenacao($this->user, Input::get('data'), Input::get('info'));
	}

}
