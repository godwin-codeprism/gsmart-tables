angular.module('qls-admin')
    .controller('eventsController', ['$scope', '$http', 'gsmartTables', function ($scope, $http, gsmartTables) {
        var dataUrl = "../data/events.json";
        var postTo = "./endpoints/write-data.php";
        var events = this;
        $http.get(dataUrl).success(function (res) {
            $scope.events = res;
        }).error(function (err) {
            console.log(err);
        });
        $scope.addRow = function (i) {
            $scope.events = gsmartTables.add($scope.events, i);
            events.postData();
        };
        $scope.removeRow = function (e, i) {
            $scope.events = gsmartTables.remove(e, $scope.events, i);
            events.postData();
        };
        $scope.editRow = function (e) {
            gsmartTables.edit(e);
        }
        $scope.saveRowText = function (e, i) {
            var newData = gsmartTables.save(e, i);
            $scope.events[newData.index].training = newData.text[0];
            $scope.events[newData.index].date = newData.text[1];
            $scope.events[newData.index].location = newData.text[2];
            $scope.events[newData.index].link = newData.link[0];
            events.postData();
        }
        this.postData = function () {
            var finalData = {
                url: '../' + dataUrl,
                data: $scope.events
            }
            $http.post(postTo, finalData).success(function (res) {
                console.log(res);
            });
        }
    }])