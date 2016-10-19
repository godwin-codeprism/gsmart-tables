angular.module('qls-admin')
    .controller('eventsController', ['$scope', '$http', 'gsmartTables', function ($scope, $http, gsmartTables) {
        var dataUrl = "../data/events.json";
        $http.get(dataUrl).success(function (res) {
            $scope.events = res;
        }).error(function (err) {
            console.log(err);
        });
        $scope.addRow = function (i) {
            $scope.events = gsmartTables.add($scope.events, i);
        };
    }])