var selectApp = angular.module('selectApp',[]);
selectApp.controller('myCtrl',function($scope){
    $scope.myOption = "--请选择--"
    $scope.myOptions = [{
        "value": 106,
        "group": "分组1",
        "label": "选项1"
    },{
        "value": 107,
        "group": "分组1",
        "label": "选项2"
    },{
        "value": 108,
        "group": "分组2",
        "label": "选项3"
    },{
        "value": 109,
        "group": "分组2",
        "label": "选项4"
    },{
        "value": 110,
        "group": "分组2",
        "label": "选项5"
    }];
})