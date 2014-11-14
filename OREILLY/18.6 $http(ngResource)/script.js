
var HttpREST = angular.module('HttpREST',['ngResource']);

HttpREST.factory('cardResource',function($resource){
    return $resource('/card/user/:userID/:id',{userID:123,id:'@id'},{charge:{method:'POST',params:{charge:true},isArray:false}})
});
HttpREST.factory('httpCard',function($q,cardResource){
    return {
        getById:function(cardID){
            var defer = $q.defer();
            cardResource.get({id:cardID},function(data,headers){
                defer.resolve(data);
            },function(res){
                defer.reject(res);
            });
            return defer.promise
        },
        query:function(){
            var defer = $q.defer();
            cardResource.query({},function(data,headers){
                defer.resolve(data);
            },function(res){
                defer.reject(res);
            });
            return defer.promise
        }
    }
});

HttpREST.controller('Card',function($scope,httpCard,cardResource){
    //通过id获取银行卡
    $scope.card_1 = httpCard.getById(1);
    $scope.card_2 = httpCard.getById(2);
    $scope.card_3 = httpCard.getById(3);
    //获取所有的银行卡
    $scope.cards = httpCard.query();
    //更新id为3的银行卡
    $scope.updataCard = function(){
        $scope.card_3.then(function(data){
            data.name='工商银行';
            //cardResource.save(data);
            data.$save()
        });
    };
    //添加id为4的银行卡
    $scope.addCard4 = function(){
        var card_4 = new cardResource();
        card_4['id'] = 4;
        card_4['name'] = '浦发银行';
        card_4['amount'] = 0;
        cardResource.save(card_4,function(data){$scope.card_4=data});
        //card_4.$save(function(data){$scope.card_4=data});
    };
    //添加没有id的银行卡
    $scope.addCard = function(){
        var newCard = new cardResource();
        newCard['name'] = '农业银行';
        newCard['amount'] = 0;
        cardResource.save(newCard,function(data){$scope.card_5=data});
        //newCard.$save(function(data){$scope.card_5=data});
    };
    //id为1的建设银行卡增加100元
    $scope.addCharge = function(){
        $scope.card_1.then(function(card){
            card.$charge({amount:100});
        })
    };
    //删除id为1的银行卡
    $scope.delCard1 = function(){
        $scope.card_1.then(function(card){
            //card.$delete();
            cardResource.delete(card)
        })
    }

});



