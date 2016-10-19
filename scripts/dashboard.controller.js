angular.module('qls-admin')
    .controller('dashboardCrtl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
        $scope.smallMenu = false;
        $scope.sidebar = [{
            title: 'Dashboard',
            icon: 'fa fa-object-group',
            hasSubMenu: false,
            state: 'dashboard.home'
        }, {
            title: 'Components',
            icon: 'fa fa-th',
            hasSubMenu: true,
            subMenu: false,
            subMenuItems: [{
                'title': 'Events',
                state: 'dashboard.events'
            }, {
                'title': 'Testimonials',
                state: 'dashboard.testimonials'
            }, {
                'title': 'Clients',
                state: 'dashboard.clients'
            }]
        }];
        $scope.shrinkMenu = function () {
            ($scope.smallMenu) ? $scope.smallMenu = false: $scope.smallMenu = true;
        }
        $scope.tabIndicator = function (e) {
            var _this = e.currentTarget;
            var indicator = document.getElementsByClassName('tabs-indicator')[0];
            if (e.type == 'mouseenter') {
                angular.element(indicator).css({
                    'opacity': 1,
                    'top': angular.element(_this).offset().top + 'px'
                });
            } else if (e.type == 'mouseleave') {
                angular.element(indicator).css({
                    'opacity': 0,
                    'top': '0px'
                });
            }
        }
        $scope.toggleSubmenu = function (e, i) {
            var _this = e.currentTarget;
            ($scope.smallMenu) ? $scope.smallMenu = false: false;
            ($scope.sidebar[i].subMenu) ? $scope.sidebar[i].subMenu = false: $scope.sidebar[i].subMenu = true;
            $state.go($scope.sidebar[i].state);
        }
        $scope.logout = function () {
            var data = {
                token: localStorage.getItem('token')
            }
            $http.post('endpoints/logout.php', data).success(function (res) {
                if (res == 'LOGGED_OUT') {
                    localStorage.removeItem('token');
                    $state.go('login');
                }
            })
        }
    }])