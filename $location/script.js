/*21.1 $location*/
var locationApp = angular.module('locationApp',[]);
locationApp.config(function($locationProvider){
    $locationProvider.html5Mode(true).hashPrefix('!');
});
locationApp.controller('locationCtrl',function($scope,$location,$timeout,$rootScope){
    $scope.location=function(newLocation){
        return $location.url(newLocation);
    };
    $scope.absurl = $location.absUrl();
    $scope.url = $location.url();
    $scope.path = $location.path();
    $scope.protocol = $location.protocol();
    $scope.host = $location.host();
    $scope.port = $location.port();
    $scope.hash = $location.hash();
    $scope.search = $location.search();

    $scope.refresh = function(){
        $scope.absurl = $location.absUrl();
        $scope.url = $location.url();
        $scope.path = $location.path();
        $scope.hash = $location.hash();
        $scope.search = $location.search();
    };

    //重写url部分,相应的absurl,url,path,hash,search都会改变
    $scope.changeUrl = function(){
        $location.url('/foo2?name=bunny2&age=12#myhash2');
    };

    //重写path部分,相应的absurl,url,path都会改变
    $scope.changePath = function(){
        $location.path('/foo2/foo3');
    };

    //重写hash部分,相应的absurl,url,hash都会改变
    $scope.changeHash = function(){
        $location.hash('myhash3');
    };

    //修改search部分(方法1),相应的absurl,url,search,hash都会改变
    //指定两个参数,第一个参数是属性名,第二个参数是属性值.
    //如果属性名是已有属性,则修改,如果属性名不是已有的,则新增.
    //属性值也可以是一个数组,参考方法6
    $scope.changeSearch_1 = function(){
        $location.search('name','code_bunny');
    };

    //修改search部分(方法2),相应的absurl,url,search,hash都会改变
    //指定两个参数,第二个参数是null:删除第一个参数所指定的属性名.不再有这个属性
    //若第一个参数不是已有的,则不发生任何改变
    $scope.changeSearch_2 = function(){
        $location.search('age',null);
    };

    //修改search部分(方法3),相应的absurl,url,search,hash都会改变
    //指定一个参数,json对象,直接重写整个search部分.不管是不是已有属性,全部重写.
    //这里属性的值可以是一个数组,参考方法5
    $scope.changeSearch_3 = function(){
        $location.search({name:'papamibunny',age:16,love:'zxg'});
    };

    //修改search部分(方法4),相应的absurl,url,search,hash都会改变
    //指定一个参数,字符串,整个search部分就变为这个字符串.注意是没有属性值的.
    $scope.changeSearch_4 = function(){
        $location.search('bunnybaobao');
    };

    //修改search部分(方法5),相应的absurl,url,search,hash都会改变
    //其余和方法3一样.全部重写search:
    //指定一个参数,json格式,属性值是一个数组,那么最后的search会变成name=code_bunny&name=white_bunny&name=hua_bunny
    $scope.changeSearch_5 = function(){
        $location.search({name:['code_bunny','white_bunny','hua_bunny']});
    };

    //修改search部分(方法6),相应的absurl,url,search,hash都会改变
    //其余和方法1一样,修改指定的属性名(或新增)
    //第二个参数是一个数组,最后search中的love部分会变成love=zxg&love=mitu
    //它和方法5的区别,就像方法1和方法3的区别,一个是修改或新增某个属性值,一个是重置整个search
    $scope.changeSearch_6 = function(){
        $location.search('love',['zxg','mitu']).replace();
    };

    //使用$location.replace(),则这一次的修改路径不会被记录到历史记录中,点击后退,不会后退到改变前的路径,而是后退到改变前的路径的改变前的路径

    $rootScope.$on('$locationChangeStart',function(){
        console.log('开始改变$location')
    });
    $rootScope.$on('$locationChangeSuccess',function(){
        $scope.refresh();
        console.log('结束改变$location')
    });
    //这里就算绑定了$routeChangeStart和$routeChangeSuccess,也不会被触发,因为这里没有$route相关的服务.
});
//注意这里$scope下的这些值是不会实时更新的.举栗url,$location.url()是个方法,获取当前的url,而不是一个值,
//所以,当url发生改变以后,不再次调用$location.url(),url值是不可能被实时更新的.