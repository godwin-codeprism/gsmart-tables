angular.module('qls-admin')
    .service('gsmartTables', function () {
        this.add = function (dataArray, itemIndex) {
            dataArray.splice((itemIndex + 1), 0, {});
            return dataArray;
        };
        this.remove = function (e, dataArray, itemIndex) {
            var _this = e.currentTarget;
            if (angular.element(_this).parent().hasClass('btn-delete')) {
                angular.element(_this).parent().hide();
                angular.element(_this).parent().next().show();
            } else {
                if (angular.element(_this).hasClass('yes')) {
                    dataArray.splice(itemIndex, 1);
                } else {
                    angular.element(_this).parent().parent().hide();
                    angular.element(angular.element(_this).parent().parent().parent()[0].getElementsByClassName('btn-delete')[0]).show();
                }
            }
            return dataArray;
        }
    })