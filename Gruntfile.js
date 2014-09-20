module.exports = function (grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    nodewebkit: {
      options: {
        platforms: ['osx'],
        buildDir: './webkitbuilds' // Where the build version of my node-webkit app is saved
      },
      src: ['./app/**/*'] // Your node-webkit app
    }
  });

  grunt.registerTask('default', ['nodewebkit']);
};