var lists = ['服饰','箱包','美妆','生活','家装'];
var subMenu = angular.module('SubMenu',[]);
subMenu.directive('expender',function(){
    return {
        restrict:"EA",
        replace:true,
        templateUrl:'./views/submenu.html',
        transclude:true,
        link:function(scope,element,attr){
            scope.toggle=function(){
                scope.ifShow = !scope.ifShow;
                scope.text = scope.ifShow ? '点击收起' :'点击展开';
            }
        }
    }
});
subMenu.controller('submenu',['$scope',function($scope){
    $scope.text = '点击展开';
    $scope.lists = lists;
}]);