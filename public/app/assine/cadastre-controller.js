/*
 * CadastreController AngularJS controller
 */

define([], function() { 
return ['$scope', '$modal', 'Franquia', 'Assinatura', 'Assinante',
function($scope, $modal, Franquia, Assinatura, Assinante) {

    $scope.franquias = Franquia.all();

    $scope.opcoes = Assinante.opcoes;

    $scope.assinante = Assinante.novo = Assinante.create({ assinatura: Assinatura.nova });

    $scope.$watch('assinante.endereco.cep', $scope.assinante.endereco.buscarEndereco);

    $scope.voltar = function() {
        $('#cadastre').slideUp();
        $('#assine').slideDown();
    };

    $scope.confirmarCadastro = function()
    {
        $scope.signupForm.submitted = true;

        if (!$scope.signupForm.$valid || Assinante.salvando) return false;

        $modal.open({ templateUrl: 'confirmar-cadastro.html', scope: $scope })

        .result.then($scope.assinante.cadastrar);
    };

    Assinante.salvar.success = function() {
        window.name = '';
        window.location = '/minha-conta/admin#loja';
    };

    Assinante.salvar.error = function(response) {
        $scope.cadastroErro = '' + (response.error ? response.error.message : '');
        $modal.open({ templateUrl: 'cadastro-falhou.html', scope: $scope });
    };

}]; });
