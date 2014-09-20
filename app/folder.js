/**
 * Created by Suman on 18/09/14.
 */

angular.module('orb').directive('openFolder', function (Project) {

  function postLink(scope, element) {
    scope.openFileBrowser = function () {
      element.children()[1].click();
    };

    var folder = element.children()[1];

    folder.addEventListener('change', function (evt) {
      var folderPath = this.value + '/';
      if (scope.role === 'new') {
        Project.create(folderPath);
      } else if (scope.role === 'open') {
        Project.open(folderPath);
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
    template: '<span><button ng-click="openFileBrowser()">{{ buttonName }}</button><input type="file" nwdirectory/></span>',
    link: postLink
  };

});
