angular.module('orb').controller('appCtrl', function ($scope, Screen) {
  $scope.screens = Screen.list();
  $scope.imagePath = localStorage.folderPath + 'resources/screens/';
  $scope.removeScreen = function (screen) {
    Screen.remove(screen);
    $scope.screens = Screen.list();
  };
  $scope.$on('Image:dropped', function () {
    $scope.screens = Screen.list();
    $scope.$apply();
  });
  $scope.newProject = function(){
    document.getElementById('new').click();
  };
  $scope.openProject = function(){
    document.getElementById('open').click();
  };
});