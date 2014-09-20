angular.module('orb').service('Project', function () {

  function create(folderPath) {
    console.log('create new project at = ' + folderPath);
  }

  function open(folderPath) {
    console.log('open project from  = ' + folderPath);
  }

  return {
    create: create,
    open: open
  }
});