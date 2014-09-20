/**
 * Created by Suman on 18/09/14.
 */

var folder = document.getElementById('folder');

folder.addEventListener('change', function (evt) {
  var folderPath = this.value + '/';
  localStorage.folderPath = folderPath;
}, false);
