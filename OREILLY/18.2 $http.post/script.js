//var jsonData = {name:'code_bunny'};
var jsonData = 'name=code_bunny';
var httpGet = angular.module('HttpGet',[]);
httpGet.factory('getData',function($http,$q){
    return function(){
        var defer = $q.defer();
        $http.post('/api/user',jsonData,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).success(function(data,status,headers,congfig){
            defer.resolve(data);
        }).error(function(data,status,headers,congfig){
            defer.reject(data);
        });

        return defer.promise
    }
});
httpGet.controller('dataController',function($scope,getData){
    $scope.data = getData()
});



