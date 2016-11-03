angular.module('qls-admin')
    .controller('testimonialsController', ['$scope', '$http', 'gsmartTables', function ($scope, $http, gsmartTables) {
        var dataUrl = "../data/testimonials/testimonials.json";
        var postTo = "./endpoints/write-data.php";
        var testimonials = this;
        this.backEndLocation = './endpoints/upload-img.php';
        this.saveImagesTo = '../../data/testimonials/images';
        this.defaultImg = '../data/testimonials/images/profile_null.jpg';
        $http.get(dataUrl).success(function (res) {
            testimonials.data = res;
        }).error(function (err) {
            console.log(err);
        });
        $scope.addRow = function (i) {
            var optionalData = {
                name: '',
                message: '',
                image: './data/testimonials/images/profile_null.jpg'
            };
            testimonials.data = gsmartTables.add(testimonials.data, i, optionalData);
            testimonials.postData();
        };
        $scope.removeRow = function (e, i) {
            testimonials.data = gsmartTables.remove(e, testimonials.data, i);
            testimonials.postData();
        };
        $scope.editRow = function (e) {
            gsmartTables.edit(e, testimonials.defaultImg);
        };
        $scope.saveRowText = function (e, i) {
            var newData = gsmartTables.save(e, i, testimonials.backEndLocation, testimonials.saveImagesTo);
            testimonials.data[newData.index].name = newData.text[0];
            testimonials.data[newData.index].message = newData.text[1];
            (newData.image[0] != undefined) ? testimonials.data[newData.index].image = './data/testimonials/images/' + newData.image[0]: false;
            testimonials.postData();
        };
        this.postData = function () {
            var finalData = {
                url: '../' + dataUrl,
                data: testimonials.data
            }
            $http.post(postTo, finalData).success(function (res) {
                console.log(res);
            });
        }
    }])