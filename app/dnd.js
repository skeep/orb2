/**
 * Created by Suman on 18/09/14.
 */
angular.module('orb').directive('dnd', function (Screen) {

  function postLink(scope) {
    var _ = require('lodash');
// prevent default behavior from changing page on dropped file
    window.ondragover = function (e) {
      e.preventDefault();
      return false
    };
    window.ondrop = function (e) {
      e.preventDefault();
      return false
    };

    var holder = document.getElementById('holder');
    holder.ondragover = function () {
      this.className = 'hover';
      return false;
    };
    holder.ondrop = function () {
      console.log('done');
      this.className = '';
      return false;
    };
    holder.ondrop = function (e) {
      e.preventDefault();

      var files = [];

      _.each(e.dataTransfer.files, function(file){
        files.push(file);
      });

      Screen.add(files);

      scope.$emit('Image:dropped');

      return false;
    };
  }

  return {
    template: '<div id="holder"></div>',
    restrict: 'E',
    link: postLink
  }

});
