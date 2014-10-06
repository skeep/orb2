angular.module('orb').service('Link', function () {

  var fs = require('fs');

  var linkList = {};

  if (!_.isUndefined(sessionStorage.Links)) {
    linkList = JSON.parse(sessionStorage.Links);
  }

  function saveTosessionStorage() {
    sessionStorage.Links = JSON.stringify(linkList);
  }

  function genUID() {
    return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
  }

  function linkExists(source, destination) {
    var filter = _.filter(linkList, function (link) {
      var sourceExist = _.contains(link.source, source);
      var destinationExist = link.destination === destination ? true : false;
      return (sourceExist && destinationExist);
    });
    if (filter.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  function add(source, destination) {
    if (!linkExists(source, destination)) {
      var ID = genUID();

      var link = {
        id: ID,
        source: [],
        destination: '',
        top: 0,
        left: 0,
        width: 50,
        height: 50
      };
      link.destination = destination;
      link.source.push(source);

      linkList[ID] = link;
    }
    saveTosessionStorage();
  }

  function remove(id, source) {
    var removedLink = _.remove(linkList[id].source, function (link) {
      return link === source;
    });
    saveTosessionStorage();
  }

  function update(id, detail) {
    _.each(detail, function (val, key) {
      linkList[id][key] = val;
    });
    saveTosessionStorage();
  }

  function get(id) {
    var links = _.filter(linkList, function (link) {
      return _.contains(link.source, id);
    });
    return links;
  }

  function isLinkOfSelectedScreen(screenId, selectedScreenId) {
    return (linkExists(selectedScreenId, screenId));
  }

  return {
    add: add,
    get: get,
    remove: remove,
    update: update,
    isLinkOfSelectedScreen: isLinkOfSelectedScreen
  }

});