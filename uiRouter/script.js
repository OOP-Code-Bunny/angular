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
            return 'partials/contacts.'+$stateParams.name+'.html'
        },
        resolve:{
            title:function(){
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
