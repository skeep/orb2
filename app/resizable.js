angular.module('orb').directive('resizable', function (Link) {

  var resizableConfig = {};


  function postLink(scope, element) {

    resizableConfig.stop = function (e, ui) {
      Link.update(scope.link.id, {
        width: ui.size.width,
        height: ui.size.height
      })
    };

    $(element).resizable(resizableConfig);
  }

  return {
    link: postLink
  };

});