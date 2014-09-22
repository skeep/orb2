angular.module('orb').controller('appCtrl', function ($scope, Screen, Project) {

  function updateScreens(){
    $scope.screens = Screen.list();
    $scope.imagePath = Project.info.folderPath + Project.info.screensFolder;
    $scope.$apply();
  }

  $scope.screens = Screen.list();
  $scope.imagePath = Project.info.folderPath + Project.info.screensFolder;
  $scope.removeScreen = function (screen) {
    Screen.remove(screen);
    updateScreens();
  };
  $scope.$on('Image:dropped', function () {
    updateScreens();
  });
  $scope.$on('Project:opened', function () {
    updateScreens();
  });
  $scope.newProject = function () {
    document.getElementById('new').click();
  };
  $scope.openProject = function () {
    document.getElementById('open').click();
  };
  $scope.saveProject = function(){
    Project.save();
  }
  $scope.closeProject = function(){
    Project.close();
    updateScreens();
  }
});