angular.module('orb').controller('appCtrl', function ($scope, Screen, Project) {

  function updateScreens(doApply) {
    doApply = typeof doApply === 'undefined' ? true : doApply;
    if (!_.isUndefined(localStorage.Project) && !_.isUndefined(localStorage.Screens)) {
      $scope.screens = Screen.list();
      $scope.imagePath = Project.info().folderPath + Project.info().screensFolder;
      if (doApply) {
        $scope.$apply();
      }
    }
  }

  $scope.screens = Screen.list();
  $scope.imagePath = Project.info().folderPath + Project.info().screensFolder;

  console.log($scope.screens, $scope.imagePath);

  $scope.removeScreen = function (screen) {
    Screen.remove(screen);
    updateScreens(false);
  };
  $scope.$on('Image:dropped', function () {
    updateScreens();
  });
  $scope.$on('Project:opened', function () {
    updateScreens();
  });
  $scope.$on('Project:created', function () {
    updateScreens();
  });
  $scope.newProject = function () {
    document.getElementById('new').click();
  };
  $scope.openProject = function () {
    document.getElementById('open').click();
  };
  $scope.saveProject = function () {
    Project.save();
  }
  $scope.closeProject = function () {
    Project.close();
    updateScreens();
  }
});