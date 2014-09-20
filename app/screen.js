angular.module('orb').service('Screen', function () {

  var fs = require('fs'),
    _ = require('lodash');

  var _basePath = localStorage.folderPath;
  var screensPath = _basePath + 'resources/screens/';

  var screenList = {};


  function genUID() {
    return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
  }

  function copyFiles(files, newFiles) {
    _.each(files, function (file) {
      //checking newFiles list not ensure to add only new files to object list
      if (_.contains(newFiles, file.name)) {
        console.log('creating object for ' + file.name);
        var UID = genUID();
        var screen = {
          id: UID,
          name: file.name
        }
        screenList[UID] = screen;
      }
      fs.createReadStream(file.path).pipe(fs.createWriteStream(screensPath + file.name));
    });
    saveToLocalStorage();
    console.table(screenList);
  }

  function saveToLocalStorage() {
    localStorage.screens = JSON.stringify(screenList);
  }

  function getScreensFileList() {
    return fs.readdirSync(screensPath);
  }

  function add(files) {
    //check for existing file
    var existingFiles = getScreensFileList();
    var droppedFiles = _.map(files, function (file) {
      return file.name;
    });
    var commonFiles = _.intersection(droppedFiles, existingFiles);
    var newFiles = _.difference(droppedFiles, existingFiles);

    //if file exist then confirm
    if (commonFiles.length > 0) {
      if (confirm(_(commonFiles).toString() + ' already exists. Do you want replace ?')) {
        copyFiles(files, newFiles);
      }
    } else {
      copyFiles(files, newFiles);
    }
  }

  function list() {
    if (_.isEmpty(screenList) && typeof localStorage.screens !== 'undefined') {
      screenList = JSON.parse(localStorage.screens);
    }
    var screens = _.map(screenList, function (screen) {
      return screen;
    });
    return screens;
  }

  function remove(screen) {
    console.log(screensPath + screen.name, screen.id);
    fs.unlinkSync(screensPath + screen.name);
    delete screenList[screen.id];
    saveToLocalStorage();
    console.table(screenList);
  }

  return {
    add: add,
    remove: remove,
    list: list
  }
});