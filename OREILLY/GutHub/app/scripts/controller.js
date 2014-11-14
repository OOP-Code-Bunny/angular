var app = angular.module('myRecipe',['myRecipe.service','myRecipe.directive']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        controller:'List',
        templateUrl:'views/list.html',
        resolve:{
            recipes: ['loadRecipes',function(loadRecipes){
                return loadRecipes()
            }]
        }
    }).when('/view/:recipeId',{
        controller:'ViewRecipe',
        templateUrl:'views/viewRecipe.html',
        resolve:{
            recipe:['loadRecipe',function(loadRecipe){
                 return loadRecipe()
            }]
        }
    }).when('/edit/:recipeId',{
        controller:'EditRecipe',
        templateUrl:'views/editRecipe.html',
        resolve:{
            recipe:['loadRecipe',function(loadRecipe){
                return loadRecipe()
            }]
        }
    }).when('/new',{
        controller:'NewRecipe',
        templateUrl:'views/editRecipe.html'
    }).otherwise({redirectTo:'/'})
}]);
app.controller('List',['$scope','recipes',function($scope,recipes){
    $scope.recipes = recipes;
}]);
app.controller('ViewRecipe',['$scope','recipe',function($scope,recipe){
    $scope.recipe = recipe;
}]);
app.controller('EditRecipe',['$scope','$location','recipe','Recipe',function($scope,$location,recipe,Recipe){
    $scope.recipe = recipe;
    $scope.save = function(invalid){
        if(invalid){
            return false
        }
/*        $scope.recipe.$save(function(){
            $location.path('/view/'+$scope.recipe.id)
        });*/
        Recipe.save($scope.recipe,function(){
            $location.path('/view/'+$scope.recipe.id)
        });
    };
    $scope.del = function(){
        $scope.recipe.$delete();
        $location.path('/')
    }
}]);
app.controller('EditIngredients',['$scope',function($scope){
    $scope.add = function(){
        $scope.recipe.ingredients[$scope.recipe.ingredients.length] = {}
    };
    $scope.deleted = function(index){
        $scope.recipe.ingredients.splice(index,1)
    }
}]);
app.controller('NewRecipe',['$scope','Recipe','$location',function($scope,Recipe,$location){
    $scope.recipe = new Recipe({
        ingredients:[{}]
    });
    $scope.save = function(invalid){
        if(invalid){
            return false
        }
        Recipe.save($scope.recipe,function(recipe){
            $location.path('/view/'+recipe.id)
        });
    };
    $scope.del = function(){
        delete $scope.recipe;
        $location.path('/')
    };
}]);