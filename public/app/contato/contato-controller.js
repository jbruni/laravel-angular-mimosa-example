/*
 * ContatoController AngularJS controller
 */

define([], function() { return ['$scope', '$http', function($scope, $http) {

    $scope.contato  = { nome: '', telefone: '', email: '', mensagem: '', destino: '' };

    $scope.enviando = false;

    $scope.destinatarios = null;

    $http.get('contatos', {cache: true}).success(function(destinatarios) {
        $scope.destinatarios = destinatarios;
    });

    $scope.enviarMensagem = function()
    {
        $scope.contatoForm.submitted = $scope.contatoForm.mensagem.$valid;

        if (!$scope.contatoForm.mensagem.$valid) {

            alert('Escreva uma mensagem antes de enviar.');

        }
        
        if (!$scope.contatoForm.$valid || $scope.enviando) return false;

        $scope.enviando = true;

        $http.post('contato', $scope.contato).then(function() {

            alert('Mensagem enviada.\nEntraremos em contato.');
            $scope.contato.mensagem = '';
            $scope.enviando = false;
            $scope.contatoForm.submitted = false;

        }, function() {

            alert('Falha ao enviar a mensagem.\nVerifique sua conexão e tente novamente.');
            $scope.enviando = false;
            $scope.contatoForm.submitted = false;

        });
    };

}]; });
