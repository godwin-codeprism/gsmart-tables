'use strict';

angular.module('qls-admin', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('admin', {
                url: '',
                template: 'redirecting...',
                controller: function ($http, $state) {
                    var data;
                    if (localStorage.getItem('token') !== null) {
                        data = {
                            token: localStorage.getItem('token')
                        };
                    } else {
                        data = {
                            token: 'notLoggedin'
                        };
                    }
                    $http.post('endpoints/check-token.php', data).success(function (res) {
                        if (res == 'authorized') {
                            $state.go('dashboard');
                        } else {
                            $state.go('login');
                        }
                    });
                }
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                resolve: {
                    isAuth: AuthChecker
                },
                controller:'dashboardCrtl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
    }]);

function AuthChecker($http, $state) {
    var data;
    if (localStorage.getItem('token') !== null) {
        data = {
            token: localStorage.getItem('token')
        };
    } else {
        data = {
            token: 'notLoggedin'
        };
    }
    $http.post('endpoints/check-token.php', data).success(function (res) {
        if (res == 'authorized') {
            return res;
        } else {
            $state.go('login');
        }
    });

};