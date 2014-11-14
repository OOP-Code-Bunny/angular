var typeAhead = angular.module('typeAhead',[]);

typeAhead.factory('getItems',function($http){
    return $http({method:'GET',url:'/state'})
});

typeAhead.controller('tahCtrl',function(getItems,$scope){
    getItems.then(function(res){$scope.items = res.data;console.log($scope.items)});
    $scope.model=undefined;
    $scope.chooseCallback = function(name){
        console.log('选中了'+name)
    }
});

typeAhead.directive('typeahead',function($timeout){
    return {
        restrict:'EA',
        templateUrl:'template',
        scope:{
            items:'=',
            model:'=',
            def:'@defaultValue',
            choosed:'&'
        },
        link:function(scope,iele,iattr){
            scope.ifChooseShow = false;
            scope.choose = function(name){
                scope.model = name;
                scope.ifChooseShow = false;
                scope.choosed({name:scope.model});
            }
        }
    }
});

typeAhead.directive('hoverActive',function(){
    return {
        restrict:'EA',
        link:function(scope,iele,iattr){
            iele.bind('mouseenter',function(){
                iele.addClass('active')
            });
            iele.bind('mouseleave',function(){
                iele.removeClass('active')
            })
        }
    }
});
