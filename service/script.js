var serviceApp = angular.module('serviceApp',[]);

serviceApp.controller('myCtrl',function($scope,myConfig){
    $scope.name = myConfig.name;
    $scope.love = myConfig.love;
    $scope.age = myConfig.age;
    $scope.money = myConfig.money;
    $scope.id = myConfig.getId();
    $scope.$watch(myConfig.love,function(){$scope.love = myConfig.love;});
});

serviceApp.controller('myOtherCtrl',function($scope,myConfig){
    $scope.name = myConfig.name;
    $scope.love = myConfig.love;
    angular.extend(myConfig,{love:'zxg'});
    $scope.$watch(myConfig.love,function(){$scope.love = myConfig.love;});
});





/************************constant创建服务************************/
/*serviceApp.constant('myConfig',{
    name:'code_bunny',
    age:12,
    getId:function(){
        return 1
    }
});*/


/************************value创建服务************************/
/*serviceApp.value('myConfig',{
    name:'code_bunny',
    age:12,
    getId:function(){
        return 1
    }
});*/


/************************factory创建服务************************/
/*serviceApp.factory('myConfig',function(){
    var myname = 'code_bunny';
    var age = 12;
    var id = 1;
    return {
        name: myname,
        age: age,
        getId: function(){
            return id
        }
    }
});*/

//或者直接这样:
/*serviceApp.factory('myConfig',function(){
    return new constructorFun()
});*/


/************************service创建服务************************/
/*serviceApp.service('myConfig',function(){
    var myname = 'code_bunny';
    var age = 12;
    var id = 1;
    this.name = myname;
    this.age = age;
    this.getId = function(){
        return id
    }
});*/

//或者直接这样:
/*serviceApp.service('myConfig',constructorFun);*/


/************************provider创建服务************************/
/*serviceApp.provider('myConfig',function(){
   return {
       $get:function(){
           var myname = 'code_bunny';
           var age = 12;
           var id = 1;
           return {
               name: myname,
               age: age,
               getId: function(){
                   return id
               }
           }
       }
   }
});*/
/************************provider创建服务(可配置参数)************************/
serviceApp.provider('myConfig',function(){
    var id = 1;
    return {
        setID:function(newID){
            id = newID
        },
        $get:function(){
            var myname = 'code_bunny';
            var age = 12;
            return {
                name: myname,
                age: age,
                getId: function(){
                    return id
                }
            }
        }
    }
});
serviceApp.config(function(myConfigProvider){
    myConfigProvider.setID(2)
});


function constructorFun(){
    var myname = 'code_bunny';
    var age = 12;
    var id = 1;
    this.name = myname;
    this.age = age;
    this.getId = function(){
        return id
    }
}

serviceApp.config(function($provide){
    $provide.decorator('myConfig',function($delegate){
        console.log($delegate);
        $delegate.money = '100w';
        return $delegate
    })
});
