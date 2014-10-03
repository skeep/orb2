angular.module('orb').service('Project', function () {

  var fs = require('fs');

  var Project = {
    name: 'My awesome project',
    folderPath: '',
    screensFolder: 'screens/'
  };

  if (!_.isUndefined(sessionStorage.Project)) {
    Project = JSON.parse(sessionStorage.Project);
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
      sessionStorage.Project = JSON.stringify(Project);
      sessionStorage.Screens = JSON.stringify({});
      sessionStorage.Links = JSON.stringify({});
      save();
      return true;
      console.log('new project created');
    } else {
      console.log('folder not empty, it have ' + _(folderContent).toString());
      return false;
    }
  }

  function open(folderPath) {
    console.log('open project from  = ' + folderPath);
    sessionStorage.clear();
    var folderContent = fs.readdirSync(folderPath);
    if (_.contains(folderContent, '.projfile') && _.contains(folderContent, 'screens')) {
      var projfile = fs.readFileSync(folderPath + '.projfile', {
        encoding: 'utf8'
      });
      projfile = JSON.parse(projfile);
      sessionStorage.Project = JSON.stringify(projfile.Project);
      sessionStorage.Screens = JSON.stringify(projfile.Screens);
      sessionStorage.Links = JSON.stringify(projfile.Links);
      console.log(Project);
      return true;
    } else {
      console.log('invalid project folder');
      return false;
    }
  }

  function close(folderPath) {
    //save everything , do all cleanups, will think later
    sessionStorage.clear();
  }

  function save() {
    var projfileContent = {
      Project: JSON.parse(sessionStorage.Project),
      Screens: JSON.parse(sessionStorage.Screens),
      Links: JSON.parse(sessionStorage.Links)
    };
    console.log(projfileContent);
    fs.writeFileSync(Project.folderPath + '.projfile', JSON.stringify(projfileContent, null, 2));
  }


  return {
    create: create,
    open: open,
    close: close,
    info: function () {
      var p;
      if (!_.isUndefined(sessionStorage.Project)) {
        p = JSON.parse(sessionStorage.Project);
      }
      return p;
    },
    save: save
  }
});