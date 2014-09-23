angular.module('orb').directive('draggable', function () {


  return {
    link: function postLink(scope, element) {
      $(element).draggable({
        stop: function (e) {
          console.log('dragged', e);
        }
      });
    }
  };


});