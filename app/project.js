angular.module('orb').service('Project', function () {

  var fs = require('fs'),
    _ = require('lodash');

  var Project = {
    name: 'My awesome project',
    folderPath: '',
    screensFolder: 'screens/'
  };

  if (!_.isUndefined(localStorage.Project)) {
    Project = JSON.parse(localStorage.Project);
  }

  function create(folderPath) {
    console.log('create new project at = ' + folderPath);
    var folderContent = fs.readdirSync(folderPath);
    if (folderContent.length === 0) {
      var projectName = prompt('Project name?');
      if (!_.isEmpty(projectName)) {
        Project.name = projectName;
        Project.folderPath = folderPath;
      }
      fs.mkdirSync(folderPath + 'screens');
      fs.writeFileSync(folderPath + '.projfile', '{}');
      localStorage.Project = JSON.stringify(Project);
      localStorage.Screens = JSON.stringify({});
      return true;
      console.log('new project created');
    } else {
      console.log('folder not empty, it have ' + _(folderContent).toString());
      return false;
    }
  }

  function open(folderPath) {
    console.log('open project from  = ' + folderPath);
    localStorage.clear();
    var folderContent = fs.readdirSync(folderPath);
    if (_.contains(folderContent, '.projfile') && _.contains(folderContent, 'screens')) {
      var projfile = fs.readFileSync(folderPath + '.projfile', {
        encoding: 'utf8'
      });
      projfile = JSON.parse(projfile);
      localStorage.Project = projfile.Project;
      localStorage.Screens = projfile.Screens;
      return true;
    } else {
      console.log('invalid project folder');
      return false;
    }
  }

  function close(folderPath) {
    //save everything , do all cleanups, will think later
    localStorage.clear();
  }

  function save() {
    var projfileContent = {
      Project: localStorage.Project,
      Screens: localStorage.Screens
    };
    fs.writeFileSync(Project.folderPath + '.projfile', JSON.stringify(projfileContent));
  }


  return {
    create: create,
    open: open,
    close: close,
    info: Project,
    save: save
  }
});