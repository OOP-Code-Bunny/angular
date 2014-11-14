var directive = angular.module('myRecipe.directive',[]);
directive.directive('focus',function(){
    return {
        link:function(scope,elements,attrs,controller){
            elements[0].focus();
        }
    }
});
directive.directive('loading',['$rootScope',function($rootScope){
    return {
        link:function(scope,elements,attrs,controller){
            $rootScope.$on('$routeChangeStart',function(){
                elements.show()
            });
            $rootScope.$on('$routeChangeSuccess',function(){
                elements.hide()
            })
        }
    }
}]);
