angular.module('qls-admin')
    .controller('dashboardCrtl', ['$scope', '$http', function ($scope, $http) {
        $scope.smallMenu = false;
        $scope.sidebar = [{
            title: 'Components',
            icon: 'fa fa-th',
            subMenu: false,
            subMenuItems: [{
                'title': 'Events'
            }, {
                'title': 'Testimonials'
            }, {
                'title': 'Clients'
            }]
        }]
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
            ($scope.sidebar[i].subMenu) ? $scope.sidebar[i].subMenu = false: $scope.sidebar[i].subMenu = true;
        }
    }])