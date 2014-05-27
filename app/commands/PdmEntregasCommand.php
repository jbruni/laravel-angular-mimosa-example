<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class PdmEntregasCommand extends Command {

	protected $name = 'pdm:entregas';

	protected $description = 'Geração das listas de entrega.';

	protected $data_da_entrega;

	protected function getOptions()
	{
		return array(
			array('data', null, InputOption::VALUE_REQUIRED, 'Data da lista de entrega a ser gerada, no formato DD/MM/AAAA (default: amanhã)', null),
		);
	}

	public function fire()
	{
		$data_option = $this->option('data');

		if (is_null($data_option))
		{
			$this->data_da_entrega = Carbon::now()->startOfDay()->addDay();
		}
		else
		{
			$data_da_entrega = Carbon::createFromFormat('d/m/Y', $data_option);

			if (!$data_da_entrega)
			{
				return $this->error('Data inválida: ' . $data_option);
			}

			$data_da_entrega->startOfDay();

			$diff = Carbon::now()->startOfDay()->diffInDays($data_da_entrega, false);

			if (($diff > 1) || ($diff < -45))
			{
				return $this->error('A data deve ser no mínimo 45 dias atrás e no máximo amanhã.');
			}

			$this->data_da_entrega = $data;
		}

		$this->geraListasDeEntrega();
	}

	// ESTE CÓDIGO ESTÁ SENDO SUBSTITUÍDO PELO NOVO MÉTODO "geraListasDeEntrega"... TODO: pensar melhor os parâmetros do comando
	public function geraTodasListasDeEntrega()
	{
		$entregas = Entrega::where('data', $this->data_da_entrega->format('Y-m-d'));

		if ($entregas->count() > 0)
		{
			$this->error('Já existem entregas agendadas para ' . $this->data_da_entrega->format('d/m/Y') . '.');
			$this->comment('A lista de entregas para essa data já foi processada.');
			$this->comment('Se você quiser continuar, a lista existente será REMOVIDA, e uma nova lista será gerada.');
			$this->error('NÃO É recomendável continuar! Só faça isso se souber as consequências.');

			// Este comando deve ser chamado manualmente somente nos casos de
			// FALHA na geração da lista diária; e isso deve ser feito
			// o mais rapidamente possível!

			do
			{
				$acao = strtolower($this->ask('Digite CONTINUAR para prosseguir ou SAIR para terminar:'));
			}
			while (!in_array($acao, array('continuar', 'sair')));

			if ($acao == 'sair')
			{
				return;
			}

			$entregas->delete();
		}

		$gerador = new Business\FechamentoDiario\GeracaoDasListasDeEntrega($this->data_da_entrega);

		$gerador->setLogger($this);

		$gerador->gerarListasDeEntrega();
	}

	public function geraListasDeEntrega()
	{
		$horaAtual = Carbon::now()->hour;

		$gerador = new Business\FechamentoDiario\GeracaoDasListasDeEntrega($this->data_da_entrega);

		$gerador->setLogger($this);

		$contratos = Contrato::where('horario_fechamento', $horaAtual . ':00:00')->get();

		if ($contratos->count() > 0)
		{
			$this->info('*** Gerando listas de entrega para o dia ' . $this->data_da_entrega->format('d/m/Y') . ' (fechamento: ' . $horaAtual . ' horas) ***');
		}

		foreach ($contratos as $contrato)
		{
			$gerador->gerarListaDeEntrega($contrato->id_franquia);
		}
	}

}
