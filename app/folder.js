/**
 * Created by Suman on 18/09/14.
 */

angular.module('orb').directive('openFolder', function (Project, Screen) {

  function postLink(scope, element) {
    scope.openFileBrowser = function () {
      element.children()[1].click();
    };

    var folder = element.children()[1];

    folder.addEventListener('change', function (evt) {
      var folderPath = this.value + '/';
      if (scope.role === 'new') {
        if (Project.create(folderPath)) {
          scope.$emit('Project:created');
        }

      } else if (scope.role === 'open') {
        if (Project.open(folderPath)) {
          Screen.updateList(JSON.parse(sessionStorage.Screens));
          scope.$emit('Project:opened');
        }
      } else {
        console.log('Invalid button role');
      }
    }, false);
  }

  return {
    restrict: 'E',
    scope: {
      buttonName: '@',
      role: '@'
    },
    replace: true,
    template: '<span><button ng-click="openFileBrowser()" class="btn btn-primary btn-lg">{{ buttonName }}</button><input type="file" nwdirectory/></span>',
    link: postLink
  };

});
