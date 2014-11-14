
var HttpREST = angular.module('Async',[]);

//基本例子
/*HttpREST.controller('promise',function($q,$http){
    var defer = $q.defer();    //创建了一个defer对象;

    var promise = defer.promise;    //创建了defer对象对应的promise

    promise.then(function(data){console.log('成功'+data)},function(data){console.log('失败'+data)});    //promise对象定义了成功回调函数,失败回调函数

//对promise发起通知: 1.执行这段代码的时候就是执行回调的时候, 2.调用resolve方法,表示需要被执行的是成功的回调, 3.resolve里的参数就是回调执行的时候需要被传入的参数

    defer.resolve('code_bunny')
});*/

//defer.resolve(),defer.reject(),defer.notify()
/*HttpREST.controller('promise',function($q,$http,$scope){
    var defer = $q.defer();         //创建了一个defer对象;

    var promise = defer.promise;    //创建了defer对象对应的promise

    promise.then(function(data){$scope.name='成功'+data},function(data){$scope.name='失败'+data},function(data){$scope.name='进度'+data});

    $http({
        method:'GET',
        url:'/name'
    }).then(function(res){
        defer.resolve(res.data)
    },function(res){
        defer.reject(res.data)
    })
});*/

//.then()的链式调用
/*HttpREST.controller('promise',function($q,$http,$scope){
    var defer = $q.defer();         //创建了一个defer对象;

    var promise = defer.promise;    //创建了defer对象对应的promise

    promise.then(function(data){
        $scope.name='成功'+data;
        return data+'2'
    },function(data){
        $scope.name='失败'+data;
        return data+'2'
    },function(data){
        $scope.name='进度'+data;
        return data+'2'
    }).then(function(data){
        $scope.name2 = '成功'+data
    },function(data){
        $scope.name2 = '失败'+data
    });

    $http({
        method:'GET',
        url:'/name'
    }).then(function(res){
        defer.resolve(res.data)
    },function(res){
        defer.reject(res.data)
    })
});*/

//.catch()
/*HttpREST.controller('promise', function ($q, $http, $scope) {
    var defer = $q.defer();         //创建了一个defer对象;

    var promise = defer.promise;    //创建了defer对象对应的promise

    promise.catch(function (data) {
        $scope.name = data;
        return data+2
    }).then(function (data) {
            $scope.name2 = '成功' + data
        }, function (data) {
            $scope.name2 = '失败' + data
        });

    $http({
        method: 'GET',
        url: '/name'
    }).then(function (res) {
            defer.resolve(res.data)
        }, function (res) {
            defer.reject(res.data)
        })
});*/


//.finally()
/*HttpREST.controller('promise', function ($q, $http, $scope) {
    var defer = $q.defer();         //创建了一个defer对象;

    var promise = defer.promise;    //创建了defer对象对应的promise

    promise.finally(function () {
        $scope.name = '已接收通知';
        return 'code_dog'
    }).then(function (data) {
            $scope.name2 = '成功' + data
        }, function (data) {
            $scope.name2 = '失败' + data
        });

    $http({
        method: 'GET',
        url: '/name'
    }).then(function (res) {
            defer.resolve(res.data)
        }, function (res) {
            defer.reject(res.data)
        })
});*/

//$q.reject(data)
/*HttpREST.controller('promise', function ($q, $http, $scope) {
    var defer = $q.defer();         //创建了一个defer对象;

    var promise = defer.promise;    //创建了defer对象对应的promise

    promise.finally(function () {
        return $q.reject('code_dog')
    }).then(function (data) {
            $scope.name2 = '成功' + data
        }, function (data) {
            $scope.name2 = '失败' + data
        });

    $http({
        method: 'GET',
        url: '/name'
    }).then(function (res) {
            defer.resolve(res.data)
        }, function (res) {
            defer.reject(res.data)
        })
});*/


//$q.reject(data)
/*HttpREST.controller('promise', function ($q, $http, $scope) {
    var defer = $q.defer();         //创建了一个defer对象;

    var promise = defer.promise;    //创建了defer对象对应的promise

    promise.then(function (data) {
        return $q.reject(data+'2')
    },function(data){
        return $q.reject(data+'2')
    }).then(function (data) {
            $scope.name2 = '成功' + data
        }, function (data) {
            $scope.name2 = '失败' + data
        });

    $http({
        method: 'GET',
        url: '/name'
    }).then(function (res) {
            defer.resolve(res.data)
        }, function (res) {
            defer.reject(res.data)
        })
});*/

//$q.all()
/*HttpREST.controller('promise', function ($q, $http, $scope) {
    var defer1 = $q.defer();         //创建了一个defer对象;

    var promise1 = defer1.promise;    //创建了defer对象对应的promise

    var defer2 = $q.defer();         //创建了一个defer对象;

    var promise2 = defer2.promise;    //创建了defer对象对应的promise

    promise1.then(function (data) {
        $scope.name1 = data;
        return data+'.2'
    },function(data){
        $scope.name1 = data;
        return data+'.2'
    }).then(function (data) {
            $scope.name2 = 'promise1成功' + data
        }, function (data) {
            $scope.name2 = 'promise1失败' + data
        });

    promise2.then(function (data) {
        $scope.age1 = data;
        return data+'.2'
    },function(data){
        $scope.age1 = data;
        return data+'.2'
    }).then(function (data) {
            $scope.age2 = 'promise2成功' + data
        }, function (data) {
            $scope.age2 = 'promise2失败' + data
        });

    var promise3 = $q.all([promise1,promise2]);
    promise3.then(function(data){
        $scope.three = data;
    },function(data){
        $scope.three = data;
    });

    $http({
        method: 'GET',
        url: '/name'
    }).then(function (res) {
            defer1.resolve(res.data)
        }, function (res) {
            defer1.reject(res.data)
        });

    $http({
        method: 'GET',
        url: '/age'
    }).then(function (res) {
            defer2.resolve(res.data)
        }, function (res) {
            defer2.reject(res.data)
        })
});*/

//$q.when()-1:第一个参数不是promise对象
/*HttpREST.controller('promise', function ($q, $http, $scope) {

    $q.when('code_dog',function(data){
        $scope.name = '成功' + data;
        return data+'2'
    },function(data){
        $scope.name = data;
        return data+'2'
    }).then(function (data) {
        $scope.name2 = '成功' + data
    }, function (data) {
        $scope.name2 = '失败' + data
    });

});*/

//$q.when()-2:第一个参数是promise对象
HttpREST.controller('promise', function ($q, $http, $scope) {
    var defer = $q.defer();         //创建了一个defer对象;

    var promise = defer.promise;    //创建了defer对象对应的promise

    $q.when(promise,function(data){
        $scope.name = data;
        return data+'2'
    },function(data){
        $scope.name = data;
        return data+'2'
    }).then(function (data) {
        $scope.name2 = '成功' + data
    }, function (data) {
        $scope.name2 = '失败' + data
    });

    //这样写得到的结果也是等价的.
/*    promise.then(function(data){
        $scope.name = data;
        return data+'2'
    },function(data){
        $scope.name = data;
        return data+'2'        
    }).then(function (data) {
        $scope.name2 = '成功' + data
    }, function (data) {
        $scope.name2 = '失败' + data
    });*/

    $http({
        method: 'GET',
        url: '/name'
    }).then(function (res) {
        defer.resolve(res.data)
    }, function (res) {
        defer.reject(res.data)
    });

});
