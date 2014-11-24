
var app = angular.module('customControl',[]);
app.controller('ctrl',function($scope){
});

app.directive('validateName',function($http,$q){
    return {
        restrict:'A',
        require:'?^ngModel',
        link:function(scope,iele,iattr,ctrl){
            ctrl.$validators.validCharacters = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return value ? value.indexOf('bunny')!==-1 : true
            };
            ctrl.$asyncValidators.uniqueUsername = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                // Lookup user by username
                return $http.get('/api/users/' + value).
                then(function resolved(res) {
                    if(res.data){
                        //用户名已经存在,验证失败,给下一个promise传递失败通知.
                        return $q.reject('res.data');
                    }
                    else {
                        //用户名不存在,验证成功.
                        return true
                    }

                }, function rejected() {
                    //username does not exist, therefore this validation passes
                    //return true;
                })
            };
        }
    }
});

