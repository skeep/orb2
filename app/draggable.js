angular.module('orb').directive('draggable', function (Screen, Link) {

  var draggableConfig = {};

  draggableConfig.scroll = true;


  function postLink(scope, element) {

    draggableConfig.stop = function stopDragging(e, ui) {
      if (scope.draggableType === 'screen') {
        Screen.update(scope.draggableId, {
          left: ui.position.left,
          top: ui.position.top
        });
      } else if (scope.draggableType === 'link') {
        Link.update(scope.draggableId, {
          left: ui.position.left,
          top: ui.position.top
        });
      }
    };

    if (scope.draggableType === 'link') {
      draggableConfig.containment = 'parent';
    }
    $(element).draggable(draggableConfig);
  }

  return {
    scope: {
      draggableId: '=',
      draggableType: '@'
    },
    link: postLink
  };

});