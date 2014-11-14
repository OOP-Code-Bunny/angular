/*3.1 作用域*/
function GreetCtrl($scope) {  $scope.name = 'World';}
function ListCtrl($scope) {  $scope.names = ['Igor', 'Misko', 'Vojta'];}

/*4.1 控制器*/
function MyCtrl($scope){
  $scope.action = function(){
    $scope.name = 'ok'
  };
  $scope.name = 'world'
}