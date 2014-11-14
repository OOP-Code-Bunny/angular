var notePad = angular.module('notePad',['ngResource']);
notePad.factory('myNotes',['$resource',function($resource){
    return $resource('/notes/:id',{id:'@id'},{mysave:{isArray:true,method:'POST'},mydel:{isArray:true,method:'DELETE'}})
}]);
notePad.factory('loadNotes',['myNotes','$q',function(myNotes,$q){
    return function(){
        var defer = $q.defer();
        myNotes.query(function(notes){
            defer.resolve(notes);
        },function(err){
            defer.reject(err)
        });
        return defer.promise
    }
}]);
notePad.factory('loadNote',['myNotes','$q',function(myNotes,$q){
    return function(noteId){
        var defer = $q.defer();
        myNotes.get({id:noteId},function(note){
            defer.resolve(note);
        },function(err){
            defer.reject(err)
        });
        return defer.promise
    }
}]);
notePad.directive('notepad',['loadNotes','loadNote','myNotes',function(loadNotes,loadNote,myNotes){
    return {
        restrict:'EA',
        templateUrl:'template.html',
        scope:{},
        link:function(scope,iEle,iAttr){
            scope.editMode = false;
            scope.curText = '';
            scope.index = -1;
            loadNotes().then(function(data){scope.notes=data},function(data){});
            var editBox =  iEle.find('.edit');
            editBox.bind('keydown keyup',function(){
                scope.curText = $(this).text()
            });
            //进入编辑模式(修改或新增)
            scope.editNote = function(id,index){
                scope.editMode = true;
                //不知道为什么不能成功 iEle.find('.edit').focus();
                //修改任务
                if(id != undefined){
                    //scope.curText = scope.notes[id]['content'];
                    loadNote(id).then(function(data){scope.curText = data['content']});   //id是对象对应的索引
                    scope.index = index;                                                  //index是数组对应的索引
                }
                //新建任务
                else {
                    scope.index = -1;
                    scope.curText = undefined; //这里写成scope.curText=''就不对,只能写成undefined,原因不详.
                }
            };
            //进入列表模式(保存修改或新增)
            scope.saveNote = function(){
                scope.editMode = false;
                //保存修改
                if(scope.index != -1){
                    //通过index操作数组中对应项内容:
                    scope.notes[scope.index].content = scope.curText;
                    scope.notes[scope.index].title = scope.curText.length>5 ? scope.curText.substring(0,5)+'...' : scope.curText;
                    //提交的时候id是对象的id属性,而不是index值
                    myNotes.mysave(scope.notes[scope.index],function(data){scope.notes=data});
                }
                //保存新建
                else {
                    var newNote = new myNotes();
                    newNote.content = scope.curText;
                    newNote.title = scope.curText.length>5 ? scope.curText.substring(0,5)+'...' : scope.curText;
                    myNotes.mysave(newNote,function(data){scope.notes=data});
                }
            };
            //删除任务
            scope.delNote = function(index){
                myNotes.mydel(scope.notes[index],function(data){scope.notes=data;console.log(data)});
                //不能使用这种方式,因为要把返回数据格式转换为数组
                //scope.notes[index].$delete(function(data){scope.notes=data; console.log(data)});
                return false
            }
        }
    }
}]);

//angular-resource会把json转换为数组.
//数组是数组,原来的对象是原来的对象,原来的对象保留了自己的属性索引和id,但是变为数组以后,索引还是0,1,2,3,它和对象的id是无关的,不是对应的.
//scope.index是资源在数组中的索引,不是资源的id



