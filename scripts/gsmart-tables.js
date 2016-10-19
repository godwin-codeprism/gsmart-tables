angular.module('qls-admin')
    .service('gsmartTables', function () {
        this.add = function (dataArray, itemIndex) {
            dataArray.splice((itemIndex + 1), 0, {});
            return dataArray;
        };
        this.remove = function(){
            
        }
    })