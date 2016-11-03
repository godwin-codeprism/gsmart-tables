angular.module('qls-admin')
    .service('gsmartTables', [function () {
        var $this = this;
        // add function
        this.add = function (dataArray, itemIndex, optionalData) {
            if (optionalData != undefined) {
                dataArray.splice((itemIndex + 1), 0, optionalData);
            } else {
                dataArray.splice((itemIndex + 1), 0, {});
            }
            return dataArray;
        };
        // delete function
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

        // edit function
        this.edit = function (e, defaultImg) {
            var _this = e.currentTarget;
            var _tr = this.parents(_this, 'TR');
            var addLink = angular.element("<button type='button' title='Provide URL' class='btn btn-info btn-xs link_btn' data-placement='top' data-content=\"<input type='text' class='form-control' placeholder='http://..'><br/><button class='btn btn-primary btn-sm btn-block save-link'>Save Link</button>\"><i style='font-size:10px;' class='glyphicon glyphicon-link'></i></button>");
            var imgOptions = angular.element('<div class="img-overlay"><input type="file"><a class="btn-action change-img" data-toggle="tooltip" title="Change Image"><i class="fa fa-refresh"></i></a><a class="btn-action remove-img" data-toggle="tooltip" title="Remove Image"><i class="fa fa-times"></i></a></div>');
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
                if (angular.element(element)[0].dataset.type == 'image') {
                    angular.element(element).append(imgOptions);
                    $('[data-toggle="tooltip"]').tooltip();
                    // adds click functionality for change image button
                    $('.change-img').click(function () {
                        $(this).parent().find('input[type="file"]').trigger('click');
                    });

                    // adds click functionality for remove image button
                    $('.remove-img').click(function () {
                        $(element).find('img').attr('src', defaultImg);
                        $(element).find('img').attr('data-remove', true);
                    });
                }
            });
        };
        // save function
        this.save = function (e, i, backEnd) {
            var _this = e.currentTarget;
            var _tr = this.parents(_this, 'TR');
            var data = {
                index: i,
                text: {},
                link: {},
                image: {}
            };
            angular.element(_this).hide();
            angular.element(this.parents(angular.element(_this), 'TD')[0].getElementsByClassName('edit')[0]).show();
            angular.forEach(angular.element(_tr).children(), function (element, index) {
                if (angular.element(element)[0].dataset.type == 'text') {
                    data.text[index] = angular.element(element).text();
                    angular.element(element).removeAttr('contenteditable');
                }
                if (angular.element(element)[0].dataset.type == 'link') {
                    var popoverId = $(element).find('.link_btn').attr('aria-describedby');
                    if (popoverId) {
                        if ($('#' + popoverId).find('input[type="text"]').val() == $(element).find('a').attr('href')) {
                            data.link[0] = $(element).find('a').attr('href');
                        } else {
                            data.link[0] = $('#' + popoverId).find('input[type="text"]').val();
                        }
                        $('#' + popoverId).popover('hide');
                    }
                    $(element).find('.link_btn').remove();
                }
                if (angular.element(element)[0].dataset.type == 'image') {
                    if ($(element).find('input[type="file"]')[0].files.length > 0) {
                        data.image[0] = $this.fileUpload($(element).find('input[type="file"]')[0].files[0], backEnd, uploadLocation).generatedName;
                    } else {
                        if ($(element).find('img').attr('data-remove') == 'true') {
                            var a = $(element).find('img').attr('src');
                            data.image[0] = a.split('/')[a.split('/').length - 1];
                        }
                    }
                    $(element).find('.img-overlay').remove();
                }
            });
            return data;
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
            // Click function for close button of popover
            $(thisPopId).find('.close').click(function () {
                $(thisPopId).popover('hide');
            });
            // Click function for Save Link button
            $(thisPopId).find('.save-link').click(function () {
                $(_this).parents('td').find('a').attr('href', $(thisPopId).find('input[type="text"]').val());
                $(thisPopId).popover('hide');
            });
        }

        // image upload 
        this.fileUpload = function (file, uploadUrl, saveToUrl, name) {
            var fromData = new FormData();
            fromData.append('saveToUrl', saveToUrl);
            fromData.append('file', file);
            var ImgData = null;
            $.ajax({
                async: false,
                url: uploadUrl,
                type: 'POST',
                data: fromData,
                processData: false,
                contentType: false,
                success: function (res) {
                    ImgData = JSON.parse(res);
                }
            });
            return ImgData;
        }
    }]);