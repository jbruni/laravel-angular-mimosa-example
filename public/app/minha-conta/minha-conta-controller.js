
/*** "Minha Conta" Application (mcApp) controller ***/

// ['$scope', '$locale', 'entityManager', 'notify', mcController]
define(['require', 'es5-shim'], function(require) { return ['$scope', function($scope) {

    $scope.keys = Object.keys;

    $scope.asset = require.toUrl;

    $scope.$on('$routeChangeSuccess', function(event, current, previous) {
        $scope.route = current.$$route;
    });

/*
    $.getJSON('time', pdm.setServerTime);

    $scope.notifier = notify.getNotifier($scope);
    $scope.notifier.urlFormat = 'avisos/:name.html';

    $scope.configuracao = em.configuracao;
    $scope.franquia = em.franquia;

    $scope.hoje = pdm.formatDate(pdm.now());
    $scope.amanha = pdm.formatDate(pdm.tomorrow());
    $scope.depoisDasOito = pdm.depoisDasOito();

    $scope.tomorrow = pdm.tomorrow();
    $scope.afterTomorrow = pdm.addDays(pdm.now(), 1);
    $scope.afterMonth = pdm.addDays(pdm.now(), 30);

    $scope.diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    $scope.meses = $locale.DATETIME_FORMATS.MONTH;

    $scope.makeDate = pdm.makeDate;

    $scope.$watch('configuracao.status', function(value) {
        $scope.notifier.showIf('recem-cadastrado', (value === 'S') || (value === 'E'));
    });

    /*** ASSINATURA ***

    $scope.togglePausado = function() {
        $scope.configuracao.pausado = ($scope.configuracao.pausado == 0 ? 1 : 0);
    };

    $scope.$watch('configuracao.pausado', function(value) {
        if ($scope.configuracao.$resolved) {
            $scope.notifier.showIf('entregas-em-pausa', (value == 1) && ($scope.configuracao.pausado_dias > 0));
            em.salvarPausa();
        }
    });

    $scope.faturas = em.faturas;

    /*** LOJA ***

    $scope.confirmado  = {}; */

}]; });
