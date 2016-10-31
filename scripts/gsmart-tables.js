angular.module('qls-admin')
    .service('gsmartTables', function () {
        var $this = this;
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
        };
        this.edit = function (e) {
            var _this = e.currentTarget;
            var _tr = this.parents(_this, 'TR');
            var addLink = angular.element("<button type='button' title='Provide URL' class='btn btn-info btn-xs link_btn' data-placement='top' data-content=\"<input type='text' class='form-control' placeholder='http://..'><input type='checkbox' value='linkState'><label> Disable Link</label><br/><button class='btn btn-primary btn-sm btn-block'>Save Link</button>\"><i style='font-size:10px;' class='glyphicon glyphicon-link'></i></button>");
            angular.element(_this).hide();
            angular.element(this.parents(angular.element(_this), 'TD')[0].getElementsByClassName('save')[0]).show();
            angular.forEach(angular.element(_tr).children(), function (element, index) {
                if (angular.element(element)[0].dataset.type == 'text') {
                    angular.element(element).attr('contenteditable', true);
                }
                if (angular.element(element)[0].dataset.type == 'link') {
                    angular.element(element).css('position', 'relative');
                    angular.element(element).append(addLink);
                    angular.element(addLink).bind('click', $this.editLink);
                }
            });
        };

        this.save = function (e) {
            var _this = e.currentTarget;
            var _tr = this.parents(_this, 'TR');
            angular.element(_this).hide();
            angular.element(this.parents(angular.element(_this), 'TD')[0].getElementsByClassName('edit')[0]).show();
            angular.forEach(angular.element(_tr).children(), function (element, index) {
                if (angular.element(element)[0].dataset.type == 'text') {
                    angular.element(element).removeAttr('contenteditable');
                }
                if(angular.element(element)[0].dataset.type == 'link'){
                    var popoverId = $(element).find('.link_btn').attr('aria-describedby');
                    if(popoverId){
                        $('#' + popoverId).popover('hide');
                    }
                    $(element).find('.link_btn').remove();
                }
            });
        }

        //Utility function below
        this.parents = function (element, tagName) {
            var _this = angular.element(element);
            while (_this[0].tagName != tagName) {
                _this = angular.element(_this).parent();
            }
            return _this;
        };

        this.editLink = function (e) {
            var _this = e.currentTarget;
            var closeBtn = "<button class='close text-default' style='float:right; margin-top: -8px; font-size: 28px;color: #2c3e50;'>&times;</button>"
            $(_this).popover({
                html: true,
                container: 'body',
                trigger: 'manual'
            });
            $(_this).popover('show');
            var thisPopId = '#' + $('.popover:eq(' + ($(".popover").length - 1) + ')').attr('id');
            $(thisPopId).find('[type="text"]').val($(_this).parents('td').find('a').attr('href'));
            $(thisPopId).find('h3').append(closeBtn);
            $(thisPopId).find('.close').click(function(){
                $(thisPopId).popover('hide');
            });
        }
    })