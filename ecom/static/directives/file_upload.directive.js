(function () {
    'use strict';
    
    angular.module('ecom')
    .directive('fileModel', [
        '$parse', function ($parse) {
        /* this directive binds change event creates a dictionary with file details */
        return {
            restrict: 'EA',
            link: function(scope, element, attrs){
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                var isMultiple = attrs.multiple
                var input_file_list = [];
                element.bind('change', function(){
                    input_file_list = [];
                    angular.forEach(element[0].files, function(item){
                        var name = item.name;
                        if (name.indexOf('jpg') == -1 && name.indexOf('png') == -1 && name.indexOf('jpeg') == -1 && name.indexOf('pdf') == -1 && name.indexOf('json') == -1){
                            alert('please only select png, jpg or jpeg file');
                        } else{
                            var input_file = {
                                name: item.name,
                                size: item.size,
                                progress: 0,
                                status: 'ready to upload',
                                url: (window.URL ? URL : webkitURL).createObjectURL(item),
                                _file: item
                            }
                            input_file_list.push(input_file)
                        };
                    })
                    scope.$apply(function(){
                        if (isMultiple){
                            modelSetter(scope, input_file_list);
                        }else{
                            modelSetter(scope, input_file_list[0]);
                        }
                    });
                });
            }
        };
    }]);
    
 })();

