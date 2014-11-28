
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
            //一开始scope.userContent是空
            console.log(ngModel.$isEmpty(scope.userContent));
            ngModel.$setViewValue(attrs.defaultText);
            //调用了$setViewValue以后就不为空了,但是如果设置了ngModelOptions,则没用.
            console.log(ngModel.$isEmpty(scope.userContent));
            ngModel.$render = function(){
                element.html(ngModel.$viewValue || attrs.defaultText);
            };
            element.bind('focus',function(){
                if(element.html()==attrs.defaultText){
                    element.html('')
                }
            });
            element.bind('focus blur keyup change',function(){
                console.log(scope.userContent);    //userContent这个实际的值应该是和$modelValue一致的.
                ngModel.$setViewValue(element.html());
                console.log('$viewValue为:'+ngModel.$viewValue);
                console.log('$modelValue为:'+ngModel.$modelValue);
            });
            ngModel.$parsers.push(function(value){
                return value.toUpperCase()
            })
        }
    }
});


/*app.controller('Rollback',function($scope){
    $scope.resetWithRollback = function(e){
        if(e.keyCode == 27) {
            $scope.myValue1 = '';
            //使用了$rollbackViewValue,总是可以同步视图,清空myValue1值
            $scope.myForm2.myInput1.$rollbackViewValue();
        }
    };
    $scope.resetWithoutRollback = function(e){
        if(e.keyCode == 27){
            //并不是每次都可以成功的同步的,有时可以,有时不可以.
            $scope.myValue2 = ''
        }
    }
});*/

/*使用下面这段代码能更明显的看到两者的区别:*/
app.controller('Rollback',function($scope){
    $scope.resetWithRollback = function(e){
        if(e.keyCode == 27) {
            $scope.myForm2.myInput1.$rollbackViewValue();
        }
    };
    $scope.resetWithoutRollback = function(e){
        if(e.keyCode == 27){
            angular.noop()
        }
    }
});


