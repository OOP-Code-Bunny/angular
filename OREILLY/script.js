/*1.1 购物车实例*/
function CarController ($scope) {
    $scope.items = [
        {"title":"兔子","quantity":1,"price":"100"},
        {"title":"喵","quantity":2,"price":"200"},
        {"title":"狗只","quantity":1,"price":"400"},
        {"title":"仓鼠","quantity":1,"price":"300"}
    ];
    $scope.remove = function(index){
        $scope.items.splice(index,1)
    }
}

/*2.1 模块*/
var messages = {};
messages.message = 'hi';
messages.name = 'code_bunny';

var myAppModule = angular.module('myApp',[]);
myAppModule.controller('TextController',function($scope){
    $scope.text = messages;
});

var otherAppModule = angular.module('otherApp',[]);
otherAppModule.controller('TextController',function($scope){
    $scope.text = messages;
    $scope.text.name = 'white-bunny';
});

/*2.2 显示文本*/
function showText ($scope) {
    $scope.text = messages;
}

/*2.3.1 input数据绑定*/
function CheckStatus ($scope) {
    $scope.checkRabbit = true;
    $scope.checkDog = false;
    $scope.checkCat = false;
}

/*2.3.2 计算阶乘实例1
function Factorial ($scope) {
    $scope.factorial = {};
    $scope.factorial.number = 0;
    $scope.factorial.result = 1;
    $scope.factorialNum = function(num){
        if(num==0){
            return 1;
        }
        else {
            return num*$scope.factorialNum(--num);
        }
    };
    $scope.compute = function(){
        $scope.factorial.result = $scope.factorialNum($scope.factorial.number);
    }
}
*/

/*2.3.3 计算阶乘实例2
function Factorial ($scope) {
    $scope.factorial = {};
    $scope.factorial.number = 0;
    $scope.factorial.result = 1;
    $scope.factorialNum = function(num){
        if(num==0){
            return 1;
        }
        else {
            return num*$scope.factorialNum(--num);
        }
    };
    $scope.compute = function(){
        $scope.factorial.result = $scope.factorialNum($scope.factorial.number);
    };
    $scope.$watch('factorial.number',$scope.compute)
}
 */

/*2.3.4 计算阶乘实例3*/
function Factorial($scope) {
    $scope.factorial = {};
    $scope.factorial.number = 0;
    $scope.factorial.result = 1;
    $scope.factorialNum = function (num) {
        if (num == 0) {
            return 1;
        }
        else {
            return num * $scope.factorialNum(--num);
        }
    };
    $scope.compute = function () {
        $scope.factorial.result = $scope.factorialNum($scope.factorial.number);
    };
    $scope.reset = function () {
        $scope.factorial.number = 0;
        $scope.factorial.result = 1;
    };
}

/*3.1 非入侵式js*/
function NavController($scope) {
    $scope.doSome = function(){
        alert('a')
    };
}
function ContentController($scope) {
    $scope.doSome = function(){
        alert('b')
    };
}

/*4 迭代元素*/
function StudentList ($scope){
    $scope.students = [{"name":"code_bunny","score":"100","id":"001"},{"name":"white_bunny","score":"90","id":"002"},{"name":"black_bunny","score":"80","id":"003"}];
    $scope.insertDog = function(){
        $scope.students.splice($scope.students.length,0,{"name":"code_dog","score":"101","id":"004"})
    };
    $scope.delLast = function(){
        $scope.students.splice(-1,1)
    }
}

/*5 隐藏和显示*/
function ShowHide ($scope){
    $scope.text = "点击显示框";
    $scope.ifShow = false;
    $scope.toggleShow = function(){
        $scope.ifShow = !$scope.ifShow;
        $scope.text = $scope.text=='点击显示框' ? '点击隐藏框' : '点击显示框'
    }
}

/*6.1 css类和样式*/
function ButtonDisable ($scope){
    $scope.disable = true;
    $scope.deActive = function(){
        $scope.disable = false
    }
}

/*6.2 css类和样式*/
function WarnErr ($scope){
    $scope.ifShow = false;
    $scope.tipText = '';
    $scope.ifErr = false;
    $scope.ifWarn = false;
    $scope.showErr = function(){
        $scope.ifShow = true;
        $scope.tipText = '错误:';
        $scope.ifWarn = false;
        $scope.ifErr = true;
    };
    $scope.showWarn = function(){
        $scope.ifShow = true;
        $scope.tipText = '警告:';
        $scope.ifErr = false;
        $scope.ifWarn = true;
    }
}

/*6.3 css类和样式*/
function Restaurant ($scope){
    $scope.selRow = null;
    $scope.restaurants = [
        {"name":"happy lemon","food":"greenTea","price":"￥15"},
        {"name":"coco","food":"milkTea","price":"￥10"},
        {"name":"good fruit","food":"fruits","price":"￥20"}
    ];
    $scope.choose = function(i){
        $scope.selRow = i
    }
}

/*7.1 scr和href*/
function SrcHref ($scope){
    $scope.favorite = 'xiaohei.gif';
}

/*9.1 控制器*/
function ParentController ($scope){
    $scope.title = 'I am ParentController';
}
function SonController ($scope){
    //$scope.title = 'I am SonController';
}

/*10.1 $scope中的数据*/
function ScopeData ($scope){
    $scope.number = 0;
    $scope.computeNum = function(){
        $scope.number = $scope.number+3
    }
}

/*11.1 $watch监控数据变化1*/
function Watch ($scope){
    $scope.number = 0;
    $scope.count = function(newValue,oldValue,scope){
        $scope.result = $scope.number*3;
        console.log(newValue);
        console.log(oldValue);
        console.log(scope);
        return $scope.result
    };
    $scope.$watch('number',$scope.count,false)
}

/*11.2.1 $watch监控数据变化2 --- $watch的正常使用方法
function CartController ($scope) {
    $scope.items = [
        {"title":"兔子","quantity":1,"price":"100"},
        {"title":"喵","quantity":2,"price":"200"},
        {"title":"狗只","quantity":1,"price":"400"},
        {"title":"仓鼠","quantity":1,"price":"300"}
    ];
    $scope.remove = function(index){
        $scope.items.splice(index,1)
    };
    $scope.bill = {
        "all":0,
        "discount":0,
        "now":0
    };
    $scope.compute = function(){
        var total = 0;
        for(var i=0; i<$scope.items.length; i++){
            total += $scope.items[i].quantity*$scope.items[i].price;
        }
        $scope.bill.all = total;
        $scope.bill.discount = total >= 500 ? total*0.1 : 0 ;
        $scope.bill.now = $scope.bill.all - $scope.bill.discount
    };
    $scope.$watch('items',$scope.compute,true);
}
 */

/*11.2.2 $watch监控数据变化2 --- $watch的第一个参数为函数而不是字符串
function CartController ($scope) {
    $scope.items = [
        {"title":"兔子","quantity":1,"price":"100"},
        {"title":"喵","quantity":2,"price":"200"},
        {"title":"狗只","quantity":1,"price":"400"},
        {"title":"仓鼠","quantity":1,"price":"300"}
    ];
    $scope.remove = function(index){
        $scope.items.splice(index,1)
    };
    $scope.bill = {
        "all":0,
        "discount":0,
        "now":0
    };
    $scope.compute = function(){
        var total = 0;
        for(var i=0; i<$scope.items.length; i++){
            total += $scope.items[i].quantity*$scope.items[i].price;
        }
        $scope.bill.all = total;
        $scope.bill.discount = total >= 500 ? total*0.1 : 0 ;
        $scope.bill.now = $scope.bill.all - $scope.bill.discount
    };
    $scope.$watch($scope.compute);
}
*/

/*11.3 $watch监控数据变化3 */
function CartController ($scope) {
    $scope.items = [
        {"title":"兔子","quantity":1,"price":"100"},
        {"title":"喵","quantity":2,"price":"200"},
        {"title":"狗只","quantity":1,"price":"400"},
        {"title":"仓鼠","quantity":1,"price":"300"}
    ];
    $scope.remove = function(index){
        $scope.items.splice(index,1)
    };
    $scope.discount = 0;
    $scope.computeTotal = function(){
        var total = 0;
        for(var i=0; i<$scope.items.length; i++){
            total += $scope.items[i].quantity*$scope.items[i].price;
        }
        return total
    };
    $scope.computeDiscount = function(newV,oldV,scope){
        $scope.discount = newV >= 500 ? newV*0.1 : 0 ;
    };
    $scope.computeNow = function(){
        return $scope.computeTotal() - $scope.discount;
    };
    $scope.$watch($scope.computeTotal,$scope.computeDiscount);
}


/*12.1 模块 */
var shoppingCart = angular.module('shoppingCart',[]);
shoppingCart.factory('Items',function(){
    var items = {};
    //这段数据实际应该是从数据库拉取的
    items.query = function(){
        return [
            {"title":"兔子","quantity":1,"price":"100"},
            {"title":"喵","quantity":2,"price":"200"},
            {"title":"狗只","quantity":1,"price":"400"},
            {"title":"仓鼠","quantity":1,"price":"300"}
        ]
    };
    return items;
});
shoppingCart.controller('CartController',function($scope,Items){
    $scope.items = Items.query();
    $scope.remove = function(index){
        $scope.items.splice(index,1)
    };
    $scope.bill = {
        "all":0,
        "discount":0,
        "now":0
    };
    $scope.compute = function(){
        var total = 0;
        for(var i=0; i<$scope.items.length; i++){
            total += $scope.items[i].quantity*$scope.items[i].price;
        }
        $scope.bill.all = total;
        $scope.bill.discount = total >= 500 ? total*0.1 : 0 ;
        $scope.bill.now = $scope.bill.all - $scope.bill.discount
    };
    $scope.$watch('items',$scope.compute,true);
});


/*13.1 过滤器 */
function filter($scope){
    $scope.word  = 'code_bunny';
    $scope.day  = 1302375948026;
    $scope.num  = 12.956;
}


/*13.2 过滤器 */
var myFilter = angular.module('MyFilter',[]);
myFilter.filter('titleCase',function(){
    var titlecase = function(title,num){
        var words = title.split(' ');
        for(var i=0; i<words.length; i++){
            words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1)
        }
        return num+'. '+words.join(' ')
    };
    return titlecase
});
myFilter.controller('filter',function($scope){
    $scope.title_1 = 'i am code bunny !';
    $scope.title_2 = 'i am white bunny !'
});

/*16.1 使用指令修改DOM */
var autoFocus = angular.module('AutoFocus',[]);
autoFocus.controller('focus',function($scope){
    $scope.text="没有点击任何按钮";
    $scope.nofocus = function(){
        $scope.text="没有点击任何按钮";
    };
    $scope.hasfocus = function(){
        $scope.text="点击了有焦点按钮";
    };
});
autoFocus.directive('myautofocus',function(){
    return {
        link: function(scope,elements,attrs,controller){
            elements[0].focus();
        }
    }
});

/*17.1 校验表单 */
var formValidation = angular.module('FormValidation',[]);
formValidation.controller('myform',function($scope){
    $scope.user = {
        name:'',
        email:'',
        age:''
    };
    $scope.message = "";
    $scope.addUser = function(){
        $scope.message = "提交成功,欢迎您,"+$scope.user.name;
    }
});

/*20.1 指令 (restrict,template,replace)*/
/*var dirAppModule = angular.module('dirAppModule',[]);
dirAppModule.directive('cdHello',function(){
    return {
        restrict:'EAC',
        template:'<h3>hi,code_bunny</h3>',
        replace:true
    }
});*/

/*20.3 指令 (templateUrl)*/
/*var dirAppModule = angular.module('dirAppModule',[]);
dirAppModule.directive('cdHello',function(){
    return {
        restrict:'EAC',
        templateUrl:'hello.html',
        replace:true
    }
});*/

/*20.4 指令 (templateUrl)*/
/*var appModule = angular.module('dirAppModule', []);
appModule.run(function($templateCache){
    $templateCache.put('hello.html','<h3>hi,code_bunny</h3>')
});
appModule.directive('cdHello',function(){
    return {
        restrict:'EAC',
        templateUrl:'hello.html',
        replace:true
    }
});*/

/*20.5 指令 (transclude)*/
/*var appModule = angular.module('dirAppModule', []);
appModule.directive('cdText',function(){
    return {
        restrict:'EAC',
        templateUrl:'text.html',
        replace:true,
        transclude:'element'
    }
});*/

/*20.6 指令 (link) */
/*var appModule = angular.module('dirAppModule', []);
appModule.controller('bgColor',function($scope){});
appModule.directive('cdHello',function(){
    return {
        restrict:'EAC',
        templateUrl:'text.html',
        replace:true,
        transclude:'element',
        link:function(scope,ele,attrs,ctrl,trans){
            ele.bind('click',function(){
                scope.$apply(function(){
                    scope.color = '#C0DCC0'
                })
            });
            ele.bind('mouseover',function(){
                ele.css({'cursor':'pointer'})
            });
        }
    }
});*/

/*20.7.1 指令 */
/*var appModule = angular.module('dirAppModule', []);
appModule.controller('bgColor',function($scope){});
appModule.directive('cdHello',function(){
    return {
        restrict:'EAC',
        templateUrl:'text.html',
        replace:true,
        transclude:'element',
        scope:{
            color:'@colAttr'
        },
        link:function(scope,ele,attrs,ctrl,trans){
            ele.bind('click',function(){
                scope.$apply(function(){
                    scope.color = '#C0DCC0';
                })
            });
            ele.bind('mouseover',function(){
                ele.css({'cursor':'pointer'})
            });
        }
    }
});*/
//scope:{} 和父作用域没有任何关系
//独立作用域的{}里面只能通过@,=,&来绑定父作用域,不能自己定义作用域里的值,如果需要自定义作用域里的值,可以到link函数的scope参数里去设置.
//scope:{color:'@colAttr'},通过指令元素的col-attr属性来和父作用域的color属性绑定,能接收到父作用域color值的变化,但是子作用域的color值变化,不会影响到父作用域

/*20.7.2 指令 */
/*var appModule = angular.module('dirAppModule', []);
appModule.controller('bgColor',function($scope){});
appModule.directive('cdHello',function(){
    return {
        restrict:'EAC',
        templateUrl:'text.html',
        replace:true,
        transclude:'element',
        scope:{
            color:'=bgColor'
        },
        link:function(scope,ele,attrs,ctrl,trans){
            ele.bind('click',function(){
                scope.$apply(function(){
                    scope.color = '#C0DCC0'
                })
            });
            ele.bind('mouseover',function(){
                ele.css({'cursor':'pointer'})
            });
        }
    }
});*/
//当html中元素属性名和作用域下的属性名相同(<cd-hello color="color">,并且scope下这个值的属性名也叫color),可以直接写: scope:{color:'='}

/*20.7.3 指令 */
/*var appModule = angular.module('dirAppModule', []);
appModule.controller('sayHelloCode',function($scope){
    $scope.sayHello=function(a){alert('hello,'+a)}
});
appModule.directive('hello',function(){
    return {
        restrict:'EAC',
        replace:true,
        templateUrl:'text.html',
        transclude:'element',
        scope:{
            sayHello:'&sayhello'
        },
        link:function(scope,ele,attrs,ctrl,trans){
            ele.bind('click',function(){
                scope.sayHello({name:'code_bunny'});
            });
            ele.bind('mouseover',function(){
                ele.css({'cursor':'pointer'})
            });
        }
    }
});*/
//当html中元素属性名和作用域下的属性名相同(say-hello="sayHello()",并且scope里面这个函数的属性名也叫seyHello),可以写成{sayHello:'&'}


/*20.7.4 指令 */
/*var appModule = angular.module('dirAppModule', []);
appModule.controller('bgColor', function ($scope) {
});
appModule.directive('cdHello', function () {
    return {
        restrict: 'EAC',
        templateUrl: 'text.html',
        replace: true,
        transclude: 'element',
        scope: true,
        link: function (scope, ele, attrs, ctrl, trans) {
            ele.bind('click', function () {
                scope.$apply(function () {
                    scope.color = '#C0DCC0'
                })
            });
            ele.bind('mouseover', function () {
                ele.css({'cursor': 'pointer'})
            });
        }
    }
});*/
//scope值为true:创建一个继承了父作用域的子作用域,这样,指令可以访问到父作用域里的值,父作用域的属性值一旦被修改,子作用域里相应的属性值也会被修改,但是子作用域里的属性值修改,不会影响到父作用域里的属性值

/*20.7.5 指令 */
/*var appModule = angular.module('dirAppModule', []);
appModule.controller('bgColor', function ($scope) {
    $scope.sayHello=function(){alert('hello')}
});
appModule.directive('cdHello', function () {
    return {
        restrict: 'EAC',
        templateUrl: 'text.html',
        replace: true,
        transclude: 'element',
        scope: {
            bgColor: '@colAttr',
            textColor: '=textColor',
            sayHello: '&'
        },
        link: function (scope, ele, attrs, ctrl, trans) {
            ele.bind('click', function () {
                scope.$apply(function () {
                    scope.sayHello();
                    scope.color = '#C0DCC0';
                    scope.textColor = '#ccc';
                })
            });
            ele.bind('mouseover', function () {
                ele.css({'cursor': 'pointer'})
            });
        }
    }
});*/

/*20.8.1 指令-compile和link*/
var appModule = angular.module('dirAppModule',[]);

appModule.controller('compileCtrl',function($scope){
    $scope.things=['bunny','cat','dog'];
    $scope.reset=function(){
        $scope.things.push('pig');
    };
    $scope.resetBunny=function(){
        $scope.things[0]='Bunny'
    }
});
appModule.directive('cbRepeat',function(){
    return {
        restrict:'EAC',
        transclude:'element',
        compile:function(tEle,tAttrs,trans){
            console.log('compile-cbRepeat');
            return function(scope,iEle,iAttrs,ctrl,linker){
                console.log('post-cbRepeat');
                //scope.$new()创建一个作用域的子作用域
                //console.log(scope.$new().$parent==scope);
                var myLoop = iAttrs.cbRepeat,
                    match = myLoop.match(/\s*(.+)\s+in\s+(.*)\s*/),
                    indexString = match[1],
                    collectionString = match[2],
                    parentEle = iEle.parent(),
                    elements = [];
                scope.$watchCollection(collectionString,function(collection){
                    if(elements.length>0){
                        for(var i= 0;i<elements.length;i++){
                            elements[i].el.remove();
                            elements[i].scope.$destroy();
                        }
                        elements = [];
                    }
                    for(var i=0;i<scope[collectionString].length;i++){
                        var newScope = scope.$new();
                        newScope[indexString] = scope[collectionString][i];
                        linker(newScope,function(clone){
                            parentEle.append(clone);
                            var element = {};
                            element.el = clone;
                            element.scope = newScope;
                            element.scope.$on('$destroy',function(){
                                console.log('被移除')
                            });
                            elements.push(element);
                        })
                    }

                })
            }
        }
    }
});

appModule.directive('myWidget',function(){
    return {
        restrict:'E',
        templateUrl:'text.html',
        replace:true,
        transclude:true,
        scope:true,
        compile:function(tEle,tAttrs,trans){
            //compile函数的tEle是原始的templateElement,也就是<div><h3 ng-transclude></h3></div>
            console.log('compile-myWidget'+tEle.html());
            return function(scope,iEle,iAttrs){
                //link函数的iEle是tEle经过实例化以后的instanceElement,也就是
                //<div><h3 ng-transclude=""><span class="ng-binding ng-scope">{{thing}}</span></h3></div>
                console.log('post-myWidget'+iEle.html())
            }
        }
        //简单的说,tElement就是原始的,元素一开始是什么样子,它还是什么样子,所以它没有作用域.
        //而iElement是经过ng编译的,添加了ng-binding,ng-scope,所以它有作用域.
    }
});


/*20.8.2 指令-compile和link*/
appModule.directive('levelOne',function(){
    return {
        restrict:'E',
        scope:true,
        compile:function(tEle,tAttrs,trans){
            console.log('compile→'+'levelOne'+tEle.html());
            return {
                pre:function(scope,iEle,iAttrs){
                    console.log('pre→'+'levelOne'+iEle.html())
                },
                post:function(scope,iEle,iAttrs){
                    console.log('post→'+'levelOne'+iEle.html())
                }
            }
        }
    }
});
appModule.directive('levelTwo',function(){
    return {
        restrict:'E',
        scope:true,
        templateUrl:'text.html',
        compile:function(tEle,tAttrs,trans){
            console.log('compile→'+'levelTwo'+tEle.html());
            return {
                pre:function(scope,iEle,iAttrs){
                    console.log('pre→'+'levelTwo'+iEle.html())
                },
                post:function(scope,iEle,iAttrs){
                    console.log('post→'+'levelTwo'+iEle.html())
                }
            }
        }
    }
});
appModule.directive('levelThree',function(){
    return {
        restrict:'E',
        scope:true,
        compile:function(tEle,tAttrs,trans){
            console.log('compile→'+'levelThree'+tEle.html());
            return {
                pre:function(scope,iEle,iAttrs){
                    console.log('pre→'+'levelThree'+iEle.html())
                },
                post:function(scope,iEle,iAttrs){
                    console.log('post→'+'levelThree'+iEle.html())
                }
            }
        }
    }
});

/*
scope的$destroy方法:
function destroy() {
    if (!this.$$destroyed) {
        var a = this.$parent;
        this.$broadcast("$destroy");
        this.$$destroyed = !0;
        this !== p && (q(this.$$listenerCount, Ab(null, l, this)),
            a.$$childHead ==this && (a.$$childHead = this.$$nextSibling),
            a.$$childTail == this && (a.$$childTail = this.$$prevSibling),
            this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling),
            this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling),
            this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null,
            this.$$listeners = {},
            this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [],
            this.$destroy = this.$digest = this.$apply = y,
            this.$on = this.$watch = function () {
            return y
        })
    }
}*/

/*20.9 指令*/
/*var expanderModule = angular.module('expanderModule',[]);
expanderModule.controller('expanderCtrl',function($scope){
    $scope.title = "标题";
    $scope.contents = ['bunny','cat','dog'];
});
expanderModule.directive('expander',function(){
    return {
        restrict:'EA',
        replace:true,
        templateUrl:'text.html',
        transclude:true,
        scope:{title:'@myTitle'},
        link:function(scope,ele,attrs){
            scope.ifShow = false;
            scope.toggle = function(){
                scope.ifShow = !scope.ifShow;
            }
        }
    }
});*/
//指令元素里原本就包含的内容,他的作用域使用元素所在的作用域的父作用域,而不是指令的独立scope,所以contents值可以访问到控制器的contents,但是template里面的值却是访问指令独立作用域的.
//这里的myTitle不会被修改,所以采用@和=绑定都可以

/*20.10 指令*/
var accordionModule = angular.module('accordionModule',[]);
accordionModule.controller('accordionCtrl',function($scope){
    $scope.lists = [
        {title:'标题1',contents:['bunny1','cat1','dog1']},
        {title:'标题2',contents:['bunny2','cat2','dog2']},
        {title:'标题3',contents:['bunny3','cat3','dog3']},
        {title:'标题4',contents:['bunny4','cat4','dog4']},
        {title:'标题5',contents:['bunny5','cat5','dog5']},
        {title:'标题6',contents:['bunny6','cat6','dog6']},
        {title:'标题7',contents:['bunny7','cat7','dog7']},
        {title:'标题8',contents:['bunny8','cat8','dog8']}
    ]
});
accordionModule.directive('accordion',function(){
    return {
        restrict:'EA',
        replace:true,
        templateUrl:'vertical.html',
        transclude:true,
        controller:function(){
            this.expanders = [];
            this.closeAll = function(scope){
                angular.forEach(this.expanders,function(expander){
                    if(scope!=expander)
                    expander.ifShow = false;
                })
            };
            this.addExpander = function(scope){
                this.expanders.push(scope)
            }
        }
    }
});
accordionModule.directive('expander',function(){
    return {
        restrict:'EA',
        replace:true,
        templateUrl:'text.html',
        transclude:true,
        scope:{title:'@myTitle'},
        require:'^?accordion',
        link:function(scope,ele,attrs,ctrl){
            scope.ifShow = false;
            ctrl.addExpander(scope);
            scope.toggle = function(){
                ctrl.closeAll(scope);
                scope.ifShow = !scope.ifShow;
            }
        }
    }
});

