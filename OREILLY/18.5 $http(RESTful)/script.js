
var HttpREST = angular.module('HttpREST',[]);

HttpREST.factory('httpCard',function($http,$q){
    var baseUrl = '/card/user/123';
    return {
        //获取用户123的指定id的卡
        getById:function(id){
            var defer = $q.defer();
            $http({
                method:'get',
                url:baseUrl+'/'+id
            }).success(function(data){
                defer.resolve(data);
            }).error(function(data){
                defer.reject(data);
            });
            return defer.promise
        },
        //获取用户123的所有卡
        query:function(){
            var defer = $q.defer();
            $http({
                method:'get',
                url:baseUrl
            }).success(function(data){
                defer.resolve(data);
            }).error(function(data){
                defer.reject(data);
            });
            return defer.promise
        },
        //保存一张卡,如果原来就有id,那就是更新这张卡,如果原来没有这张卡,那就是新建这张卡,
        //新建路径就是baseUrl,更新路径就是baseUrl+id
        save:function(card){
            var defer = $q.defer();
            var url = card.id ? baseUrl+'/'+card.id : baseUrl;
            $http({
                method:'post',
                url:url,
                data:card
            }).success(function(data){
                defer.resolve(data);
            }).error(function(data){
                defer.reject(data);
            });
            return defer.promise
        },
        //删除用户123的指定id的卡
        del:function(id){
            var defer = $q.defer();
            $http({
                method:'delete',
                url:baseUrl+'/'+id
            }).success(function(data){
                defer.resolve(data)
            }).error(function(data){
                defer.reject(data)
            });
            return defer.promise
        }
    }
});

HttpREST.controller('Card',function($scope,httpCard){
    //通过id获取银行卡
    $scope.card_1 = httpCard.getById(1);
    $scope.card_2 = httpCard.getById(2);
    $scope.card_3 = httpCard.getById(3);
    //获取所有的银行卡
    $scope.cards = httpCard.query();
    //更新id为3的银行卡
    $scope.updataCard = function(){httpCard.save({id:3,name:"工商银行"}).then(function(data){$scope.card_3 = data['name']})};
    //添加id为4的银行卡
    $scope.addCard = function(){httpCard.save({name:"浦发银行"}).then(function(data){$scope.card_4 = data['name']});};
    //删除id为3的银行卡
    $scope.delCard = function(){httpCard.del(3).then(function(data){$scope.card_3 = data});}
});



