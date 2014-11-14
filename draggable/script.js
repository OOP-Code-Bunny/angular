var dragModule = angular.module('dragModule', []);
dragModule.directive('myDraggable', ['$document','$window', function($document,$window) {
    return {
        restrict:'EA',
        link:function(scope,iele,iattr){
            scope.eleWidth = iele[0].offsetWidth;               //元素的宽,预算好后面使用
            scope.eleHeight = iele[0].offsetHeight;             //元素的高,预算好后面使用
            scope.screenWidth = $window.innerWidth;             //浏览器的宽,预算好后面使用
            scope.screenHeight = $window.innerHeight;           //浏览器的高,预算好后面使用
            iele.css({
                position:'absolute',
                zIndex:100,
                left:(scope.screenWidth-scope.eleWidth)/2+'px',
                top:(scope.screenHeight-scope.eleHeight)/2+'px'
            });
            iele.bind('mousedown',function(e){
                e.preventDefault();
                var initX = iele[0].offsetLeft;                 //元素相对于浏览器的left
                var initY = iele[0].offsetTop;                  //元素相对于浏览器的top
                var mouseX = e.pageX;                           //鼠标相对于浏览器的left
                var mouseY = e.pageY;                           //鼠标相对于浏览器的top
                console.log(scope.screenWidth);
                function move(e){
                    console.log(scope.screenWidth);
                    var xCha = e.pageX-mouseX;                  //鼠标横向移动距离
                    var yCha = e.pageY-mouseY;                  //鼠标纵向移动距离
                    var endLeft = initX+xCha;                   //最终left值
                    var endTop = initY+yCha;                    //最终top值
                    endLeft = (endLeft>=0 && endLeft<scope.screenWidth-scope.eleWidth-3) ? endLeft : (endLeft<0 ? 0 : scope.screenWidth-scope.eleWidth-3);
                    endTop = (endTop>=0 && endTop<scope.screenHeight-scope.eleHeight-3) ? endTop : (endTop<0 ? 0 : scope.screenHeight-scope.eleHeight-3);
                    iele.css({
                        left:endLeft+'px',                      //实际left值
                        top:endTop+'px'                         //实际top值
                    })
                }
                $document.bind('mousemove',move);
                $document.bind('mouseup',function(e){
                    $document.unbind('mousemove',move)
                })
            });
            //$window不能绑定resize事件,只能用原生
            window.addEventListener("resize",function(){
                scope.screenWidth = $window.innerWidth;         //重置浏览器的宽高
                scope.screenHeight = $window.innerHeight;       //重置浏览器的宽高
            });
        }
    }
}]);