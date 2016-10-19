angular.module('qls-admin')
    .controller('loginCtrl', ['$scope', '$http','$state', function ($scope, $http, $state) {
        $scope.error = false;
        $scope.onLogin = function () {
            var data = {
                username: $scope.username,
                password: $scope.password
            };
            $http.post('endpoints/login.php', data).success(function (res) {
                if (res != 'ERROR') {
                    $scope.error = false;
                    localStorage.setItem('token', res);
                    $state.go('dashboard.home');
                }else{
                   $scope.error = true;
                }
            });
        }
    }])