/*
 * DuvidasController AngularJS controller
 */

define([], function() { return ['$scope', '$sce', function($scope, $sce) {

    var duvidas = [
        {
            pergunta: 'Como assinar o Pão da Manhã?',
            resposta: '<p>Para assinar, você deve preencher o cadastro <a href="/assine" class="assinar">clicando aqui</a>. Após preencher e enviar, a equipe do Pão da Manhã irá verificar se sua região já está sendo atendida, e entrar em contato para formalizar sua assinatura.</p><p>Caso sua região ainda não esteja sendo atendida, sua conta receberá um alerta lhe avisando que ainda não estamos entregando em sua região. Não se preocupe; estamos trabalhando para que muito em breve consigamos entregar em todas as regiões de sua cidade. Você pode ajudar indicando o Pão da Manhã para seus vizinhos ou conhecidos que morem próximo a você.</p>'
        },
        {
            pergunta: 'Como o pagamento é realizado?',
            resposta: '<p>As faturas da sua assinatura do Pão da Manhã possuem um ciclo do dia 5 ao dia 5 do mês seguinte. Após o fechamento de sua fatura você receberá juntamente com os pães um boleto bancário composto por sua assinatura somado aos itens que porventura tenha adquirido em nossa loja de conveniência.</p><p>Você também poderá visualizar e quitar sua fatura a qualquer momento em seu Painel do Assinante.</p>'
        },
        {
            pergunta: 'Como é feita a entrega? E se eu estiver dormindo ou não escutar o entregador?',
            resposta: '<p>Para não ter que lhe incomodar e também pelo fato de o entregador ter várias entregas na sequência, nossa entrega é feita da seguinte forma:</p><p>- Condomínios Fechados ou Edifícios: Sua encomenda será colocada na maçaneta da porta principal de sua casa ou apartamento. Ou seja, para sua maior comodidade nosso entregador nunca deixará na portaria.</p><p>- Residências: Só aceitaremos assinaturas fixas em residências que possuam um local coberto e seguro para que o entregador possa deixar a encomenda. Caso sua residência tiver muros altos e/ou portões fechados não poderemos lhe atender com uma assinatura fixa, mas você poderá utilizar nossa "Compra Avulsa", onde realizando o pedido até as 20 horas, seu café da manhã chega com hora marcada no dia seguinte.</p><p>Nesta modalidade o pagamento é feito diretamente ao entregador.<p>'
        },
        {
            pergunta: 'Caso eu precise viajar, como pauso as entregas neste período?',
            resposta: '<p>Muito Fácil. Em seu Painel do Assinante existe uma opção para isto. Marque quantos dias à frente deseja manter as entregas em pausa e pronto, sempre lembrando que para que as entregas do dia seguinte sejam pausadas, você precisa realizar esta operação até as 20 horas.</p>'
        },
        {
            pergunta: 'O Pão da Manhã entrega aos domingos e feriados?',
            resposta: '<p>Não, o Pão da Manhã entende que domingos e feriados são dias de descanso, onde seus assinantes querem acordar mais tarde, ou, querem tomar café da manhã fora.</p>'
        },
        {
            pergunta: 'Como funciona a loja de conveniência?',
            resposta: '<p>Você pode adicionar produtos para sua próxima entrega ou agendar para uma data em específico.</p><p>Se você possui uma assinatura  fixa, você pagará somente em sua próxima fatura e se você estiver realizando uma compra avulsa, deverá pagar no dia e horário marcado para nosso entregador, inclusive com cartões de crédito ou débito.</p>'
        },
        {
            pergunta: 'Posso aumentar a quantidade de pães a receber?',
            resposta: '<p>Você tem total controle sobre sua assinatura através do Painel do Assinante. Todas as alterações realizadas antes das 20 horas já entram em vigor para o dia seguinte.<p>'
        },
        {
            pergunta: 'Como fica o valor da minha assinatura se eu alterar a quantidade de pães?',
            resposta: '<p>Alterações como quantidade e dias de entrega modificam o valor de sua assinatura, portanto você será cobrado proporcionalmente (pro-rata) pela utilização dos planos.</p>'
        },
        {
            pergunta: ' Tive problemas com minha entrega, como devo proceder?',
            resposta: '<p>Entre em contato conosco informando o ocorrido pelo contato da nossa página inicial. Entraremos em contato por telefone na sequência para esclarecer o motivo.</p>'
        },
        {
            pergunta: 'Por que o Pão da Manhã ainda não entrega na minha região? O que posso fazer para receber?',
            resposta: '<p>Faça o seu cadastro e aguarde. Nós estamos trabalhando para atender todas as regiões de sua cidade. Para nos ajudar a chegar mais rápido em sua região você pode contar esta novidade para seus vizinhos e/ou conhecidos que morem perto de você, e solicitar que se cadastrem também.</p>'
        },
        {
            pergunta: 'Eu posso agendar uma entrega para uma data futura?',
            resposta: '<p>Pode, claro. Para isto, após escolher os itens em nossa Loja de Conveniência, basta selecionar uma data futura para a entrega.</p>'
        },
        {
            pergunta: 'Como abrir uma franquia do Pão da Manhã em minha cidade?',
            resposta: '<p>Envie um e-mail para <a href="mailto:franquias@paodamanha.com.br">franquias@paodamanha.com.br</a> solicitando a COF (Circular de Ofertas) que nós entraremos em contato o mais breve possível.</p>'
        }
    ];

    angular.forEach(duvidas, function(item) {
        item.pergunta = $sce.trustAsHtml(item.pergunta);
        item.resposta = $sce.trustAsHtml(item.resposta);
    });
    $scope.duvidas = duvidas;

}]; });
