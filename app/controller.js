angular.module('orb').controller('appCtrl', function ($scope, $document, Screen, Project) {

  function updateScreens(doApply) {
    doApply = typeof doApply === 'undefined' ? true : doApply;
    if (!_.isUndefined(sessionStorage.Project) && !_.isUndefined(sessionStorage.Screens)) {
      $scope.screens = Screen.list();
      $scope.imagePath = Project.info().folderPath + Project.info().screensFolder;
      if (doApply) {
        $scope.$apply();
      }
      Project.save();
    }
  }

  function update(id, screen) {
    if (!_.isUndefined(screen.linkingNow)) {
      delete screen.linkingNow;
    }
    console.log(screen);
    Screen.update(id, screen);
  }

  $scope.initProject = function () {
    if ($scope.isProjectOpen()) {
      $scope.screens = Screen.list();
      $scope.imagePath = Project.info().folderPath + Project.info().screensFolder;
      $scope.selectedScreen = {};
      $scope.Project = Project.info();
    }
  };

  $scope.getClasses = function (screenID) {

    var classes = [];

    if (screenID === $scope.selectedScreen.id) {
      classes.push('selected');
    }
    else {
      classes.push('just-dropped');
    }

    if (!_.isUndefined($scope.linking)) {
      if (screenID === $scope.linking) {
        classes.push('linking-now');
      } else {
        classes.push('accepting-link');
      }
    }

    return classes;

  };

  $scope.getStyle = function (id) {
    var screen = Screen.get(id);
    if (_.isUndefined(screen.left) && _.isUndefined(screen.top)) {
      return '';
    } else {
      return {
        position: 'absolute',
        top: screen.top + 'px',
        left: screen.left + 'px'
      };
    }
  };

  $scope.removeScreen = function (screen) {
    Screen.remove(screen);
    updateScreens(false);
  };

  $scope.changeName = function (screen) {
    update(screen.id, screen);
  };

  $scope.selectScreen = function (screen) {
    if (!$scope.selectedScreen.linkingNow) { //pick to just select the screen
      $scope.selectedScreen = screen;
    } else {
      //link the screen
      if (_.isUndefined($scope.selectedScreen.target)) {
        $scope.selectedScreen.target = [];
        $scope.selectedScreen.target.push(screen.id);
      } else {
        $scope.selectedScreen.target.push(screen.id);
      }
      update($scope.selectedScreen.id, $scope.selectedScreen);
    }
  };

  $scope.openScreen = function (screen) {
    $('#screenLarge').modal();
  };

  $scope.initLinking = function (screen) {
    if (_.isUndefined($scope.linking)) {
      $scope.linking = screen.id;
    } else {
      $scope.linking = undefined;
    }

  };

  $scope.getLinkButtonText = function (screen) {
    if (screen.id === $scope.linking) {
      return 'Stop linking ...';
    } else {
      return 'Start linking';
    }
  };

  $scope.isProjectOpen = function () {
    if (_.isUndefined(sessionStorage.Project)) {
      return false
    } else {
      return true
    }
  };

  $scope.$on('Image:dropped', function () {
    updateScreens();
  });
  $scope.$on('Project:opened', function () {
    updateScreens();
    $scope.initProject();
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
  };
  $scope.closeProject = function () {
    Project.close();
    updateScreens();
  };
});