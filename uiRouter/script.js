/*********************************************状态管理*********************************************/
var myapp = angular.module('myApp',['ui.router']);

/*使用templateUrl,并且使用$stateParams*/
/*myapp.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state('contacts',{
        url:'/contacts/:name',
        templateUrl: function($stateParams){
            return 'partials/contacts.' + $stateParams.name + '.html'
        }
    })
});*/

/*使用templateProvider,并且使用$stateParams*/
/*myapp.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state('contacts',{
        url:'/contacts/:name',
        templateProvider: function($stateParams){
            return '<h1>'+$stateParams.name+'</h1>'
        }
    })
});*/

/*使用controller-1,使用模块下定义好的controller*/
/*myapp.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state('contacts',{
        url:'/contacts/:name',
        controller:'contact',
        templateProvider: function($stateParams){
            return '<h1>'+'{{text}},'+$stateParams.name+'</h1>'
        }
    })
});
myapp.controller('contact',function($scope){
    $scope.text='hi'
});*/

/*使用controller-2,直接在controller属性里写控制器函数*/
/*
myapp.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state('contacts',{
        url:'/contacts/:name',
        controller:function($scope){
            $scope.text='hi'
        },
        templateProvider: function($stateParams){
            return '<h1>'+'{{text}},'+$stateParams.name+'</h1>'
        }
    })
});
*/

/*使用controllerAs-1,直接在controller属性里写控制器函数*/
/*myapp.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state('contacts',{
        url:'/contacts/:name',
        controller:function(){
            this.text='hi'
        },
        templateProvider: function($stateParams){
            return '<h1>'+'{{con.text}},'+$stateParams.name+'</h1>'
        },
        controllerAs:'con'
    })
});*/

/*使用controllerAs-2,使用模块下定义好的controller*/
/*myapp.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state('contacts',{
        url:'/contacts/:name',
        controller:'contact as con',
        templateProvider: function($stateParams){
            return '<h1>'+'{{con.text}},'+$stateParams.name+'</h1>'
        },
        controllerAs:'con'
    })
});
myapp.controller('contact',function(){
    this.text='hi'
});*/

/*resolve*/
/*myapp.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state('contacts',{
        url:'/contacts/:name',
        resolve:{
            //字符串格式:使用一个既有的服务
            first:'aService',
            //函数:函数的返回值就是将被注入的服务
            second:function(){
                return {data:'second的data'}
            },
            //函数:在函数中注入既有的服务
            third:function(anotherService,$stateParams){
                var data = anotherService.getName($stateParams.name);
                return {data:data}
            },
            //函数:返回一个promise对象,最终得到的将是resolve里的内容
            fourth:function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve({data:'我是fourth的data'});
                    //注意,如果一个state的resolve里的某个promise被拒绝了,那这个state直接无法继续下去了.
                    //defer.reject({data:'我是fourth的data'})
                },2000);
                return defer.promise;
            },
            //函数:返回$http返回的promise返回的promise,最终得到的是.then里面return的内容
            fifth:function($http){
                return $http({
                    method:'GET',
                    url:'/contacts/name'
                }).then(function(res){
                    return {data:res.data}
                },function(){

                })
            },
            //函数:返回$http返回的promise,最终得到的就是后台返回值.
            sixth:function($http){
                return $http({
                    method:'GET',
                    url:'/contacts/name'
                })
            }
        },
        templateUrl:function($stateParams){
            return 'partials/contacts.' + $stateParams.name + '.html'
        },
        controller:'ctrl'
    })
});
myapp.factory('aService',function(){
    return {
        getName:function(){
            alert('我是aService服务的getName方法')
        },
        data:'first的data'
    }
});
myapp.factory('anotherService',function(){
    return {
        getName:function(data){
            return data.toUpperCase()
        }
    }
});
myapp.controller('ctrl',function($scope,first,second,third,fourth,fifth,sixth){
    first.getName();
    $scope.data1 = first.data;
    $scope.data2 = second.data;
    $scope.data3 = third.data;
    $scope.data4 = fourth.data;
    $scope.data5 = fifth.data;
    $scope.data6 = sixth.data;
});*/

/*$state.current.data*/
/*myapp.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state('contacts',{
        url:'/contacts/:name',
        templateUrl:function($stateParams){
            return 'partials/contacts.'+$stateParams.name+'.html'
        },
        data:{
            stateData1:111,
            stateData2:222
        },
        controller:function($scope,$state){
            $scope.data7 = $state.current.data.stateData1 + $state.current.data.stateData2
        }
    })
});*/

/*onEnter,onExit,$stateChangeStart,$stateChangeSuccess,$stateNotFound,$stateChangeError,$viewContentLoading,$viewContentLoaded*/
myapp.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state('contacts',{
        url:'/contacts/:name',
        templateUrl:function($stateParams){
            return 'partials/contacts.'+$stateParams.name+'.html';

        },
        resolve:{
            title:function($stateParams){
                console.log($stateParams);
                return 'contacts'
            }
            /*错误的resolve会触发$stateChangeError*/
            /*names:function($http){
                return $http({
                    method:'GET',
                    url:'/error'
                })
            }*/
        },
        onEnter: function(title){
            console.log('进入'+title+'状态啦')
        },
        onExit: function(title){
            console.log('退出'+title+'状态啦')
        }
    })
});

myapp.directive('loading',function($rootScope){
    return {
        restrict:'EA',
        link:function(scope,iEle,iAttrs,ctrl){
            scope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
                console.log('状态开始改变');
                /*toState是定义.state时传入的第二个参数对象*/
                //console.log(toState);
                /*toParams就是$stateParams*/
                //console.log(toParams);
                /*fromState是上一个状态.state时传入的第二个参数对象*/
                //console.log(fromState);
                /*fromParams是上一个状态的$stateParams*/
                //console.log(fromParams);
            });
            scope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams){
                console.log('状态改变结束');
                /*参数全部同上*/
            });
            scope.$on('$stateNotFound',function(event,unfoundState,fromState,fromParams){
                console.log('没有找到对应的状态');
                /*unfoundState包含了三个属性:*/
                /*1.to:前往的状态名(也就是没有找到的这个状态名)
                * 2.toParams:前往的状态的参数(在使用ui-sref或者$state.go()的时候可以传入,这个例子里就是{a:1,b:2})
                * 3.options:使用$state.go()的时候传入的第三个参数.
                * */
                /*最后两个参数同上*/
                 console.log(unfoundState);
                //如果不写这句,那么接下来就会报错,卡住js进程了.
                event.preventDefault()
            });
            scope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
                console.log('切换状态出错');
                /*error是一个包含了错误信息的对象*/
                console.log(error);
            });
            scope.$on('$viewContentLoading',function(event,viewConfig){
                console.log('视图开始加载');
            });
            scope.$on('$viewContentLoaded',function(event){
                console.log('视图渲染完毕')
            })
        }
    }
});

/*改变状态的过程:
1.触发$stateChangeStart事件,如果使用event.preventDefault(),会阻止状态改变.
  如果没有找到对应状态,会触发$stateNotFound事件,然后中断.
2.触发$viewContentLoading事件.
3.如果在切换状态的过程中出错(比如resolve出错),触发$stateChangeError事件,无出错跳过此步.
3.触发上一个状态(若有)的onExit事件
4.触发当前状态的onEnter事件
5.触发$viewContentLoaded事件
6.触发$stateChangeSuccess事件.
*/


/*********************************************嵌套状态*********************************************/
//var nest = angular.module('nest',['ui.router']);
/*使用.state()来定义父子状态*/
/*nest.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state('contacts',{
        url:'/contacts',
        templateUrl:'contacts.html'
    }).state('contacts.list',{
        url:'/list',
        templateUrl:'contacts.list.html'
    })
});*/

/*指定parent属性来定义父子状态*/
/*nest.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state('contacts',{
        url:'/contacts',
        templateUrl:'contacts.html'
    }).state('list',{
        url:'/list',
        templateUrl:'contacts.list.html',
        parent:'contacts'
    })
});*/

/*指定parent属性为状态对象来定义父子状态*/
/*var contacts = {
    name:'parent',
    url:'/contacts',
    templateUrl:'contacts.html',
    controller:function($scope){
        $scope.contacts = [{id:0,name:'code_bunny'},{id:1,name:'white_bunny'},{id:2,name:'black_bunny'}]
    }
};
var list = {
    name:'parent.child',
    url:'/list',
    templateUrl:'contacts.list.html',
    parent:contacts
};
nest.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state(contacts).state(list);
});*/

/*resolve依赖的继承*/
/*var contacts = {
    name:'parent',
    url:'/contacts',
    templateUrl:'contacts.html',
    resolve:{
        resA:function(){
            return {value:'A'}
        }
    },
    controller:function($scope,resA){
        $scope.a = resA.value;
    }
};
var list = {
    name:'parent.child',
    url:'/list',
    templateUrl:'contacts.list.html',
    parent:contacts,
    resolve:{
        resB:function(resA){
            return {value:resA.value+'B'}
        }
    },
    controller:function($scope,resB){
        $scope.b = resB.value
    }
};
nest.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state(contacts).state(list);
});*/

/*data数据的继承*/
/*var contacts = {
    name:'parent',
    url:'/contacts',
    templateUrl:'contacts.html',
    data:{
        dataA:'a',
        dataB:'b'
    },
    controller:function($scope,$state){
        $scope.a = $state.current.data.dataA;
    }
};
var list = {
    name:'parent.child',
    url:'/list',
    templateUrl:'contacts.list.html',
    parent:contacts,
    controller:function($scope,$state){
        $scope.a = $state.current.data.dataA;
        $scope.b = $state.current.data.dataB;
    }
};
nest.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state(contacts).state(list);
});*/

/*抽象状态-给子状态们提供基础url*/
/*var contacts = {
    abstract:true,
    name:'parent',
    url:'/contacts',
    template:'<ui-view/>'
};
var list = {
    name:'parent.child',
    url:'/list',
    templateUrl:'contacts.list.html',
    parent:contacts
};
var detail = {
    name:'parent.detail',
    url:'/detail',
    templateUrl:'contacts.detail.html',
    parent:contacts
};
nest.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state(contacts).state(list).state(detail);
});*/

/*抽象状态-给子状态们提供ui-view元素*/
/*var contacts = {
    abstract:true,
    name:'parent',
    url:'/contacts',
    templateUrl:'contacts.html'
};
var list = {
    name:'parent.child',
    url:'/list',
    templateUrl:'contacts.list.html',
    parent:contacts
};
var detail = {
    name:'parent.detail',
    url:'/detail',
    templateUrl:'contacts.detail.html',
    parent:contacts
};
nest.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state(contacts).state(list).state(detail);
});*/

/*抽象状态-混合例子*/
/*var contacts = {
    abstract:true,
    name:'parent',
    url:'/contacts',
    templateUrl:'contacts.html',
    controller:function($scope){
        $scope.contacts = [{id:0,name:'code_bunny'},{id:1,name:'white_bunny'},{id:2,name:'black_bunny'}]
    }
};
var list = {
    name:'parent.child',
    url:'/list',
    templateUrl:'contacts.list.html',
    parent:contacts
};
var detail = {
    name:'parent.detail',
    url:'/detail/:id',
    templateUrl:'contacts.detail.html',
    parent:contacts,
    controller:function($scope,$stateParams){
        $scope.id = $stateParams.id
    }
};
nest.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state(contacts).state(list).state(detail);
});*/


/*********************************************多个命名的视图*********************************************/
var named = angular.module('namedView',['ui.router']);

/*var report = {
    name:'report',
    url:'/report',
    views:{
        'filters':{
            templateUrl:'report-filters.html',
            controller:function($scope){
                $scope.title="我是filters的内容"
            }
        },
        'tabledata':{
            templateUrl:'report-table.html',
            controller:function($scope){
                $scope.title="我是table的内容"
            }
        },
        'graph':{
            templateUrl:'report-graph.html',
            controller:function($scope){
                $scope.title="我是graph的内容"
            }
        }
    }
};

named.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state(report)
});*/

/*
var report = {
    name:'report',
    url:'/report',
    templateUrl:'report.html'
};
var detail = {
    name:'report.detail',
    url:'/detail',
    parent:'report',
    views:{
        //绝对名字:在父状态的template(也就是report.html)里寻找对应名字为'aaa'的ui-view元素
        'aaa':{
            templateUrl:'aaa.html'
        },
        //绝对名字:在父状态的template(也就是report.html)里寻找没有名字的ui-view元素
        '':{
            templateUrl:'report.detail.html'
        },
//        'aaa@report':{
//            templateUrl:'aaa.html'
//        },
//        '@report':{
//            templateUrl:'report.detail.html'
//        },
        //相对名字:在report.detail状态里寻找对应名字为'bbb'的ui-view元素
        'bbb@report.detail':{
            templateUrl:'bbb.html'
        },
        //相对名字:在report.detail状态里寻找对应没有名字的ui-view元素
        '@report.detail':{
            templateUrl:'no-name.html'
        },
        //相对名字:在report状态里寻找对应名字为'bbb'的ui-view元素
        'bbb@report':{
            templateUrl:'bbb2.html'
        },
        //相对名字:在根状态(named-views.html)里寻找对应名字为'aaa'的ui-view元素
        'aaa@':{
            templateUrl:'aaa2.html'
        },
        //相对名字:在根状态(named-views.html)里寻找没有名字的ui-view元素.
        //需要特别注意:这里等于是在子状态里定义了父状态的里ui-view,要这样写的话,最开始的两段绝对名字'aaa'和'',就必须改成下面注释的两段相对名字'aaa@report'和'bbb@report'.
        //否则会造成错误.
//        '@':{
//            templateUrl:'report.html'
//        }
    }
};
*/


named.config(function($locationProvider,$stateProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state(report).state(detail)
});

var urlRouting = angular.module('urlRouting',['ui.router']);
var hello = {
    name:'hello',
    /*注意,只能匹配到'/hello/',最后一个/不能少,最后一个/后面也不能再有其他内容*/
    url:'/hello/',
    template:'<h3>/hello/</h3>'
};
var user = {
    name:'user',
    /*注意,可以匹配到/user/,也就是说,参数为空也能被匹配到,使用花括号和使用:和使用正则完全一致*/
    /*url:'/user/:id',*/
    /*url:'/user/{id}',*/
    /*使用了:int,user/后面必须是一个整数,否则不匹配*/
    /*url:'/user/{id:int}',*/
    /*相当于{id}*/
    /*url:'/user/{id:[^/]*}',*/
    /*id的长度在1-8位之间*/
    /*url:'/user/{id:[0-9a-fA-F]{1,8}}',*/
    templateProvider: function($stateParams){
        return '<h1>user/'+$stateParams.id+'</h1>'
    }
};
/*var contacts = {
    name:'contacts',
    *//*匹配0-9数字,长度在1-8之间*//*
    *//*url:'/contacts/{contactId:[0-9]{1,8}}',*//*
    *//*在上面的基础上,必须要有myParam参数*//*
    *//*url:'/contacts/{contactId:[0-9]{1,8}}?myParam',*//*
    *//*在上面的基础上,必须要有myParam和myName两个参数*//*
    url:'/contacts/{contactId:[0-9]{1,8}}?myParam&myName',
    templateProvider:function($stateParams){
        return '<h1>contacts/'+$stateParams.contactId+$stateParams.myParam+$stateParams.myName+'</h1>'
    }
};*/

/************************作为父状态************************/
var contacts = {
    name:'contacts',
    url:'/contacts',
    template:'<div ui-view></div>'
};

var list = {
    name:'contacts.list',
    /*url:'/list/{contactId:[0-9]{1,8}}?myParam',*/
    /*在子路由的url前加'^',则子路由是一个单独的路由,不再和父路由进行拼合*/
    url:'^/list/{contactId:[0-9]{1,8}}?myParam',
    parent:'contacts',
    templateProvider:function($stateParams){
        return '<h1>contacts/'+$stateParams.contactId+$stateParams.myParam+$stateParams.myName+'</h1>'
    }
};

var files = {
    name:'files',
    /*匹配/files/开头的所有url,后面有多少个'/'都可以,'/'部分也会被作为path这个整体*/
    /*url:'/files/{path:.*}',*/
    /*同上,获取包括'/'的全部作为参数的一种简写*/
    url:'/files/*path',
    templateProvider:function($stateParams){
        return '<h1>files/'+$stateParams.path+'</h1>'
    }
};

var users = {
    name:'users',
    url:'/users/:id/details/{type}/{repeat:[0-9]+}?from&to',
    resolve:{
        userId: function($stateParams){
            console.log($stateParams.id);
            return $stateParams.id
        }
    },
    templateProvider:function($stateParams){
        console.log($stateParams);
        return '<h1>'+$stateParams.type+' '+$stateParams.repeat+' '+$stateParams.from+' '+$stateParams.to+'</h1>'
    },
    controller:function(userId){
        //console.log('userId='+userId)
    }

};

urlRouting.config(function($locationProvider,$stateProvider,$urlRouterProvider,$urlMatcherFactoryProvider){
    $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
    $stateProvider.state(hello).state(user).state(contacts).state(files).state(list).state(users);
    /*当导航到'/'的时候,重定向到'hello'*/
    $urlRouterProvider.when('/','hello/');
    /*没有匹配到任何状态或者.when()重定向时,重定向到'users/123/details//0'*/
    //$urlRouterProvider.otherwise('users/123/details//0');
    $urlRouterProvider.rule(function($injector,$location){
        var path = $location.path(),normalized = path.toLowerCase();
        if(path!==normalized){
            return normalized
        }

    });
    var urlMatcher = $urlMatcherFactoryProvider.compile('/home/:id?param1');
    $stateProvider.state('mystate',{
        url:urlMatcher,
        templateProvider:function($stateParams){
            return '<h1>mystate'+ $stateParams.id +'</h1>'
        }
    });
    /*注意如果一个urlMatcher既匹配了状态里的url,又匹配了.when,以状态为准,不会重定向*/
    $urlRouterProvider.when(urlMatcher,'hello/');
});



Array.prototype.dr = function(){
    var that = this;
    for(var i=0;i<that.length;i++){
        if(that[i] instanceof Array){
            that = that.slice(0,i).concat(that[i],that.slice(i+1));
            i--
        }
    }
    return that
};

var arr = [[['a','b'],1,2,3],4,[5,6,7],8];

console.log(arr.dr());
