var nrpPlayer = angular.module('NRPPlayer',[]);

nrpPlayer.controller('audioController',function(){

});

nrpPlayer.directive('audioPlayer',function(){
    return {
        restrict:'EA',
        scope:{},
        templateUrl:'player.html',
        link:function(scope,iele,iattrs){
            scope.audio = iele[0].getElementsByTagName('audio')[0];
            scope.audio.volume = 0.5;
            scope.progress = 0;
            scope.playing = false;
            scope.muted = false;
            scope.play = function(){
                scope.audio.play();
                scope.playing = true;
            };
            scope.stop = function(){
                scope.audio.pause();
                scope.playing = false;
            };
            scope.go = function(){
                scope.audio.currentTime+=5;
            };
            scope.back = function(){
                scope.audio.currentTime-=5;
            };
            scope.silence = function(){
                scope.audio.muted = true;
                scope.muted = true;
            };
            scope.sound = function(){
                scope.audio.muted = false;
                scope.muted = false;
            };
            angular.element(scope.audio).bind('timeupdate',function(){
                scope.$apply(function(){scope.progress = scope.audio.currentTime/scope.audio.duration*100});
            });
            angular.element(scope.audio).bind('ended',function(){
                scope.$apply(function(){scope.playing = false;scope.progress = 0})
            })
        }
    }
});

nrpPlayer.directive('volControl',function($document){
    return {
        restrict:'EAC',
        link:function(scope,iele,iattrs){
            var btn = angular.element(iele[0].getElementsByTagName('em'));
            var curVolBar = angular.element(iele[0].getElementsByTagName('span'));
            var endVol = 80;
            var initVol;
            var mouseX;
            btn.bind('mousedown',function(e){
                e.preventDefault();
                initVol = endVol;
                mouseX = e.pageX;
                $document.bind('mousemove',mouseMOVE);
                //这个一定要放在btn的mousedown事件里面,否则就算不是点击btn,点击其它东西,也会触发一下这个解除绑定事件,这样它还没有被绑定事件,就解除事件绑定,会有一个报错.
                $document.bind('mouseup',function(e){
                    $document.unbind('mousemove',mouseMOVE);
                });
            });
            var mouseMOVE = function(e){
                e.preventDefault();
                var mouseMX = e.pageX;
                var chaX = mouseMX-mouseX;
                var endX = initVol + chaX;
                endX = endX>=0 && endX<=160 ? endX : endX<0 ? 0 : 160;
                btn.css({left:endX+'px'});
                curVolBar.css({width:endX+'px'});
                scope.audio.volume = endX/160;
                endVol = endX;
            }

        }
    }
});