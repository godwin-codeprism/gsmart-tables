'use strict';

angular.module('qls-admin', ['ui.router', 'ngAnimate'])
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
                            $state.go('dashboard.home');
                        } else {
                            $state.go('login');
                        }
                    });
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                resolve: {
                    isAuth: AuthChecker
                },
                controller: 'dashboardCrtl',
                abstract: true
            })
            .state('dashboard.home', {
                url: '',
                templateUrl: 'views/dashboard.home.html'
            })
            .state('dashboard.events', {
                url: '/events',
                templateUrl: 'views/events.html',
                controller: 'eventsController'
            })
            .state('dashboard.testimonials', {
                url: '/testimonials',
                templateUrl: 'views/testimonials.html',
                controller: 'testimonialsController',
                controllerAs: 'testimonials'
            })
            .state('dashboard.clients', {
                url: '/clients',
                templateUrl: 'views/clients.html',
                controller: 'clientsController',
                controllerAs: 'clients'
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