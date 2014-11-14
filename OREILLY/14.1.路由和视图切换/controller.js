
var messages = [
    {
        "id":"001",
        "sender":"兔小宝",
        "subject":"给小宝买草",
        "date":"Dec 7, 2014 12:32:00",
        "recipients": ["小a","米米","小黑"],
        "content":"今天一定要给我买草啊!!!"
    },
    {
        "id":"002",
        "sender":"周孝刚",
        "subject":"给小宝加水",
        "date":"May 12, 2014 05:04:00",
        "recipients": ["兔兔","粥粥","小白"],
        "content":"今天一定要给小宝加水啊!!!"
    },
    {
        "id":"003",
        "sender":"code_bunny",
        "subject":"买凉席",
        "date":"Thu 14, 2014 04:14:00",
        "recipients": ["white_bunny","sb","小米"],
        "content":"今天一定要给买凉席啊!!!"
    }
];


var aMail = angular.module('A-Mail',[]);

aMail.controller('listControll',function($scope){
    $scope.messages = messages;
});
aMail.controller('detailControll',function($scope, $routeParams){
    var index = parseInt($routeParams.id)-1;
    $scope.message = messages[index];
});

aMail.config(function($routeProvider){
    $routeProvider.when('/',{controller:'listControll',templateUrl:'view/list.html'}).when('/view/:id',{controller:'detailControll',templateUrl:'view/detail.html'}).otherwise({redirectTo:'/'})
});


