var timeoutApp = angular.module('timeoutApp',[]);
timeoutApp.controller('myCtrl',function($scope){
    $scope.ifShowMenu = false;

});
timeoutApp.directive('dropdown',function($timeout){
    return {
        restrict:"EA",
        link:function(scope,iele,iattr){
            scope.showMenu = function(){
                $timeout.cancel(scope.t2);
                scope.t1 = $timeout(function(){
                    scope.ifShowMenu = true
                },500)
            };
            scope.hideMenu = function(){
                $timeout.cancel(scope.t1);
                scope.t2 = $timeout(function(){
                    scope.ifShowMenu = false
                },500)
            };

        }
    }
})
