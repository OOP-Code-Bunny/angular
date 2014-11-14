
var httpGet = angular.module('HttpGet',[]);
httpGet.config(function($httpProvider){
    //删除后请求头里不再有 X-Requested-With 属性
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['Authorization'] = 'code_bunny';
    //没有效果,书上写错了.
    //$httpProvider.defaults.headers['DNT']='1';
    console.log($httpProvider.defaults.headers)
});
httpGet.factory('getData',function($http,$q){
    return function(){
        var defer = $q.defer();
        $http({
            method:'get',
            url:'/api/user',
            headers: {'Authorization':'code_bunny'}
            //transformRequest:function(){},   转换请求发送的数据的格式
            //transformResponse:function(){},  转换响应得到的数据的格式
            //cache: boolean or Cache object,
            //timeout: number,
            //withCredientials: boolean
        }).success(function(data,status,headers,config){
            defer.resolve(data);
        }).error(function(data,status,headers,config){
            defer.reject(data)
        });
/*        $http.get('/api/user',{headers:{'Authorization':'code_bunny'}}).success(function(data,status,headers,congfig){
            defer.resolve(data);
        }).error(function(data,status,headers,congfig){
            defer.reject(data);
        });*/
        return defer.promise
    }
});
httpGet.controller('dataController',function($scope,getData){
    $scope.data = getData()
});



