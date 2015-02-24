module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'js/*.js', '!js/*min.js'],
      options: {
    	sub: true
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('watchme', ['watch']);

};
