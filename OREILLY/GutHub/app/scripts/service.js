var service = angular.module('myRecipe.service',['ngResource']);
service.factory('Recipe',['$resource',function($resource){
    return $resource('/recipe/:id',{id:'@id'});
}]);
service.factory('loadRecipes',['Recipe','$q',function(Recipe,$q){
    return function(){
        var defer = $q.defer();
        Recipe.query(function(recipes){
            defer.resolve(recipes);
            console.log(recipes)
        },function(err){
            defer.reject(err)
        });
        return defer.promise
    }
}]);
service.factory('loadRecipe',['Recipe','$q','$route','$routeParams',function(Recipe,$q,$route,$routeParams){
    return function(){
        var defer = $q.defer();
        Recipe.get({id:$route.current.params.recipeId},function(recipe){
            defer.resolve(recipe)
        },function(err){
            defer.reject(err)
        });
        return defer.promise
    }
}]);
