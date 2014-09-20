angular.module('orb', []).config(function ($compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist('screens/');
});
