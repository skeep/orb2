angular.module('orb').directive('draggable', function (Screen) {

  return {
    scope: {
      screenId: '='
    },
    link: function postLink(scope, element) {
      $(element).draggable({
        stop: function stopDragging(e, ui) {
          Screen.update(scope.screenId, {
            left: ui.offset.left,
            top: ui.offset.top - 50
          });
        },
        scroll: true
      });
    }
  };


});