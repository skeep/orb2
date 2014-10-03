angular.module('orb').directive('draggable', function (Screen, Link) {

  return {
    scope: {
      draggableId: '=',
      draggableType: '@'
    },
    link: function postLink(scope, element) {
      $(element).draggable({
        stop: function stopDragging(e, ui) {
          if (scope.draggableType === 'screen') {
            Screen.update(scope.draggableId, {
              left: ui.offset.left,
              top: ui.offset.top
            });
          } else if (scope.draggableType === 'link') {
            Link.update(scope.draggableId, {
              left: ui.offset.left,
              top: ui.offset.top
            });
          }

        },
        scroll: true
      });
    }
  };


});