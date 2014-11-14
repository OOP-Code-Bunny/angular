//var jsonData = {name:"code_bunny"};
var jsonData = 'name=code_bunny&age=12';

var httpGet = angular.module('HttpGet',[]);
/*httpGet.config(function($httpProvider){
    $httpProvider.defaults.transformResponse=function(data){
        return $.serialize(data)['name']
    }
});*/

httpGet.factory('getData',function($http,$q){
    return function(){
        var defer = $q.defer();
        $http({
            method:'post',
            url:'/api/user',
            data: jsonData,
            headers: {
                'Authorization':'code_bunny',
                'Content-Type':'application/x-www-form-urlencoded'
            },
            // transformRequest:function(data){
            //     console.log(data === jsonData);
            //     return data
            // },
            transformResponse:function(data){
                return $.serialize(data)['name']
            }
            //cache: boolean or Cache object,
            //timeout: 1000,
            //withCredientials: boolean
        }).success(function(data,status,headers,config){
            defer.resolve(data);
        }).error(function(data,status,headers,config){
            defer.reject(data)
        });
        return defer.promise
    }
});
httpGet.controller('dataController',function($scope,getData){
    $scope.data = getData()
});





