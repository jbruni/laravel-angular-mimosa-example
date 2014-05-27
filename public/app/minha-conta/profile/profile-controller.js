
/*** Profile controller ***/

define(['require'], function(require) { 
return ['$scope', '$modal', 'Assinante',
function($scope, $modal, Assinante) {

    $scope.opcoes = Assinante.opcoes;

    $scope.assinante = Assinante.atual();

    $scope.$watch('assinante.endereco.cep', $scope.assinante.endereco.buscarEndereco);

    $scope.alterarCadastro = function()
    {
        $scope.profileForm.submitted = true;

        if (!$scope.profileForm.$valid || Assinante.salvando || $scope.profileForm.$pristine) {
            return false;
        }

        $modal.open({ templateUrl: require.toUrl('minha-conta/profile/confirmar-alteracao.html') })

        .result.then($scope.assinante.alterar);
    };

    Assinante.salvar.success = function() {
        $modal.open({ templateUrl: require.toUrl('minha-conta/profile/alteracao-sucesso.html') });
        $scope.profileForm.$setPristine();
    };

    Assinante.salvar.error = function(response) {
        $scope.cadastroErro = '' + (response.error ? response.error.message : '');
        $modal.open({ templateUrl: require.toUrl('minha-conta/profile/alteracao-falhou.html'), scope: $scope });
    };

}]; });
