/*一个选择时间的指令,但是ng-model的双向绑定有点变化:
在视图中,timeOfDay的格式是HH:mm,但在模型中,timeOfDay的格式是从午夜零点至当前时间点的毫秒数.*/
var app = angular.module('app',[]);

app.controller('timePick',function($scope){
    $scope.setTime = function(){
        //强制设置到2:58pm这个时间点
        $scope.timeOfDay = 53907764
    }
});

app.directive('timePicker',function(){
    return {
        restrict:'EA',
        require:'^?ngModel',
        link:function(scope,iele,iattr,ctrl){

            ctrl = ctrl || {
                "$setViewValue":angular.noop
            };

            ctrl.$setViewValue(0);

            $(iele).timepicker().on('changeTime',function(){
                var seconds = $(iele).timepicker('getSecondsFromMidnight');
                //设置数据模型: 就是从午夜0点到所选择的时间的毫秒值
                ctrl.$setViewValue(seconds * 1000);
                console.log(scope.timeOfDay);
            });

            ctrl.$render = function(){
                //根据1970 年 1 月 1 日到新的时间点的毫秒数 设置时间
                //$viewValue就是timeOfDay,是从午夜0点到选择时间的毫秒数
                console.log(ctrl.$viewValue);
                $(iele).timepicker('setTime', new Date(getTodayZero().getTime() + ctrl.$viewValue));
            };

        }
    }
});

function getTodayZero(){
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today;
}


