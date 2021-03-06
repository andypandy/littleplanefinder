module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    
    //concatenate js and css
    concat: {
      js: {
        // the files to concatenate
        src: [
          'public/js/main.js',
          'public/js/app.js',
          'public/js/services/planes.js',
          'public/js/directives.js',
          'public/js/controllers.js',
          'public/js/init.js',
          ],
        // the location of the resulting JS file
        dest: 'temp/<%= pkg.name %>.js'
      },
      css: {
        src: ['public/css/*.css'],
        dest: 'temp/<%= pkg.name %>.css'
      }
    },

    
    //js min
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'public/js/<%= pkg.name %>.min.js' : ['<%= concat.js.dest %>']
        }
      }
    },


    //css min
    cssmin: {
      minify: {
        //src: '<%= concat.css.dest %>',
        src: 'temp/littleplanefinder.css',
        dest: 'public/css/style.min.css'
      }
    },


    //Removes temp folder
    clean: {
      before: ['public/css/style.min.css', 'public/js/littleplanefinder.min.js'],
      after: ['temp']
    },

    watch: {
      files: ['public/js/*.js', 'public/css/*.css', 'views/**/*.jade'],
      tasks: ['default']
    },

    karma: {
      single: {
        configFile: 'karma.conf.js'
      },
    },
  });

  //Load grunt plugin
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('default', ['clean:before', 'concat', 'uglify', 'cssmin', 'clean:after', 'watch']);
  grunt.registerTask('test', ['karma']);

};