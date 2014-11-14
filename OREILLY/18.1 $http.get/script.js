var httpGet = angular.module('HttpGet',[]);
httpGet.factory('getData',function($http,$q){
    return function(){
        var defer = $q.defer();
        $http.get('/api/user').success(function(data,status,headers,congfig){
            //console.log(status);
            //console.log(headers);
            //console.log(congfig);
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

/*status: 响应的状态码,成功就是200咯~*/

/*headers: 这样一个函数,具体是什么暂时不详
function (name) {
    if (!headersObj) headersObj =  parseHeaders(headers);

    if (name) {
        return headersObj[lowercase(name)] || null;
    }

    return headersObj;
}
*/

/*congfig: 请求的配置对象
{
    method: "GET"
    url: "/api/user"
}
如果有params,也是在这个里面的.它还可以有很多其它配置,但是在$http.get这个最基本的用法里,就这么三个
*/

//注意,以下方式是错误的,因为data是异步返回的,必须使用$q的promise
/*
var httpGet = angular.module('HttpGet',[]);
httpGet.factory('getData',function($http,$q){
    return function(){
        var newdata = '';

        $http.get('/api/user').success(function(data,status,headers,congfig){
            newdata = data;
        }).error(function(data,status,headers,congfig){
            newdata = data;
        });

        return newdata
    }
});
httpGet.controller('dataController',function($scope,getData){
    $scope.data = getData()
});
*/
