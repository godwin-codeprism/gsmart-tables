angular.module('qls-admin')
    .controller('clientsController', ['$scope', '$http', 'gsmartTables', function ($scope, $http, gsmartTables) {
        var dataUrl = "../data/clients/clients.json";
        var postTo = "./endpoints/write-data.php";
        var clients = this;
        this.backEndLocation = './endpoints/upload-img.php';
        this.saveImagesTo = '../../data/clients/images';
        this.defaultImg = '../data/clients/images/profile_null.jpg';
        $http.get(dataUrl).success(function (res) {
            clients.data = res;
        }).error(function (err) {
            console.log(err);
        });
        $scope.addRow = function (i) {
            var optionalData = {
                name: '',
                logo: './data/clients/images/profile_null.jpg'
            };
            clients.data = gsmartTables.add(clients.data, i, optionalData);
            clients.postData();
        };
        $scope.removeRow = function (e, i) {
            clients.data = gsmartTables.remove(e, clients.data, i);
            clients.postData();
        };
        $scope.editRow = function (e) {
            gsmartTables.edit(e, clients.defaultImg);
        };
        $scope.saveRowText = function (e, i) {
            var newData = gsmartTables.save(e, i, clients.backEndLocation, clients.saveImagesTo);
            clients.data[newData.index].name = newData.text[0];
            (newData.image[0] != undefined) ? clients.data[newData.index].logo = './data/clients/images/' + newData.image[0]: false;
            clients.postData();
        };
        this.postData = function () {
            var finalData = {
                url: '../' + dataUrl,
                data: clients.data
            }
            $http.post(postTo, finalData).success(function (res) {
                console.log(res);
            });
        }
    }]);