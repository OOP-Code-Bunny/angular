var app =angular.module('myApp',['ngSanitize']);
app.controller('ctrl',function($scope,$sce){
    $scope.myHtml = '<p style="color:blue">an html\n' +
    '<em onclick="this.textContent=\'code_bunny\'">click here</em>\n' +
    'snippet</p>';
    $scope.trustHtml = $sce.trustAsHtml($scope.myHtml)
});

app.controller('ctrlLinky',function($scope,$sce,$filter){
    $scope.myHtml = '<p>'+
    '下面这些都应该是链接:\n'+
    'http://angularjs.org/,\n'+
    'mailto:us@somewhere.org,\n'+
    'another@somewhere.org,\n'+
    'and one more: ftp://127.0.0.1/.\n'+
    '</p>';
    console.log($filter('linky')($scope.myHtml,'_blank'))
});
/*
1.ngSanitize添加了$sanitize服务,但这个服务是不出现在代码里的,它的出现的作用就是使得html里面可以使用ng-bind-html这个指令,能够把ng-bind-html绑定的内容进行安全编译
  安全编译的方法就是移除html上的所有属性,是所有属性,包括事件绑定,样式,等一切.仅仅保留html标签和内容.
2.如果是要改变其默认的编译方式,应该使用$sce服务.$sce服务是不依赖任何东西的.
3.如果使用了$sce来编译了html字符串,那么即使不添加ngSanitize也可以使用ng-bind-html.
4.如果既不添加ngSanitize,又不使用$sce来编译html字符串,直接在html里使用ng-bind-html,是不行的.
*/
