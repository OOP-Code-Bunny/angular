
var app = angular.module('customControl',[]);
app.controller('ctrl',function($scope){
    $scope.setNone = function(){
        $scope.userContent = '抱歉,我没有想输入的内容'
    }
});
app.directive('contenteditable',function(){
    return {
        restrict:'A',
        require:'?^ngModel',
        link:function(scope,element,attrs,ngModel){
            if(!ngModel){
                return
            }
            element.html(attrs.defaultText);
            ngModel.$setViewValue(attrs.defaultText);
            ngModel.$render = function(){
                element.html(ngModel.$viewValue || attrs.defaultText)
            };
            element.bind('focus',function(){
                if(element.html()==attrs.defaultText){
                    element.html('')
                }
            });
            element.bind('focus blur keyup change',function(){
                scope.$apply(function(){
                    ngModel.$setViewValue(element.html())
                })
            });
        }
    }
});

/*
调用$setViewValue并不会触发$render,但是userContent会被同步.
当直接修改了userContent这个值,则$render会被调用*/
