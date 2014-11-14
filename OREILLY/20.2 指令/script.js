
var dirAppModule = angular.module('dirAppModule',[]);

dirAppModule.directive('cdHello',function(){
    return {
        restrict:'EAC',
        replace:true,
        templateUrl:'hello.html'
    }
});