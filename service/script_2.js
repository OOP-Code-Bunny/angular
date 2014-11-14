var serviceApp = angular.module('serviceApp',[]);
serviceApp.controller('myCtrl',function($scope,myConfig){
    var myConfigConstant = myConfig.create();
    $scope.name = myConfigConstant.name;
    $scope.age = myConfigConstant.age;
    angular.extend(myConfigConstant,{love:'zxg'});
    $scope.love = myConfigConstant.love;
    $scope.id = myConfigConstant.getId();
    $scope.$watch(myConfigConstant.name,function(){$scope.name = myConfigConstant.name;});
    myConfigConstant.name = 'white_bunny';
});
serviceApp.controller('myOtherCtrl',function($scope,myConfig){
    var myConfigConstant = myConfig.create();
    $scope.love = myConfigConstant.love;
    $scope.name = myConfigConstant.name;
    $scope.$watch(myConfigConstant.name,function(){$scope.name = myConfigConstant.name;});
});


/************************创建实例的服务************************/
serviceApp.factory('myConfig',function(){
    return {
        //服务返回的对象有一个create方法,该方法每次被执行都会返回一个新的constructorFun实例
        create: constructorFun.createNew
    }
});

//创建一个构造函数
function constructorFun(){
    var myname = 'code_bunny';
    var age = 12;
    var id = 1;
    this.name = myname;
    this.age = age;
    this.id = id
}

//给构造函数添加createNew方法,用于实例化一个constructorFun.
constructorFun.createNew = function(){
    return new constructorFun()
};

//给构造函数添加原型的方法.使得它的实例可以继承.
constructorFun.prototype = {
    getId: function(){
        return this.id
    }
};

