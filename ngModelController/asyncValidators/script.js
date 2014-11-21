
var app = angular.module('customControl',[]);
app.controller('ctrl',function($scope){

});

app.directive('validateName',function(){
    return {
        restrict:'A',
        require:'?^ngModel',
        link:function(scope,iele,iattr,ctrl){
            ctrl.$asyncValidators.uniqueUsername = function(modelValue, viewValue) {
                var value = modelValue || viewValue;

                // Lookup user by username
                return $http.get('/api/users/' + value).
                then(function resolved() {
                    //username exists, this means validation fails
                    return $q.reject('exists');
                }, function rejected() {
                    //username does not exist, therefore this validation passes
                    return true;
                });
            };
        }
    }
});

