<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class PdmFaturasCommand extends Command {

	protected $name = 'pdm:faturas';

	protected $description = 'Geração das faturas de mensalidade.';

	public function fire()
	{
		$data_de_fechamento = Carbon::now()->startOfDay();

		if ($data_de_fechamento->day != 5)
		{
			$this->error('Hoje não é dia 5.');
			$this->comment('O dia de fechamento costuma ser dia 5.');
			$this->comment('Se você quiser continuar, escolha se quer fazer o fechamento como se fosse dia 5 deste mês, ou com a data atual mesmo.');
			$this->error('NÃO É recomendável escolher a data atual! Só faça isso se souber as consequências.');

			do
			{
				$acao = strtolower($this->ask('Digite 5 para usar dia 5, ATUAL para usar a data atual ou SAIR para terminar:'));
			}
			while (!in_array($acao, array('5', 'cinco', 'atual', 'sair')));

			if ($acao == 'sair')
			{
				return;
			}

			if ($acao != 'atual')
			{
				$data_de_fechamento->day = 5;
			}

			$this->info('Usando data de fechamento: ' . $data_de_fechamento->format('d/m/Y') . "\n");
		}

		$gerador = new Business\FechamentoMensal\GeracaoDasFaturasDeMensalidade($data_de_fechamento->subDay());

		$gerador->setLogger($this);

		$gerador->gerarFaturasDeMensalidade();
	}

}
