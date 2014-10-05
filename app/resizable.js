angular.module('orb').directive('resizable', function (Link) {

  var resizableConfig = {};


  function postLink(scope, element) {

    $(element).resizable(resizableConfig);
  }

  return {
    link: postLink
  };

});