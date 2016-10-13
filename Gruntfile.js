module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var themeJs = [
    'js/scripts.js',
  ];

  var config = {
    // Load data from package.json
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      themeJs: {
        files: {
          'dist/js/main.js': themeJs
        }
      }
    },
    watch: {
      sass: {
        files: ['scss/*.scss'],
        tasks: ['sass:dev'],
        options: {
          livereload: true
        }
      },
      themeJs: {
        files: themeJs,
        tasks: ['concat:themeJs']
      }
    },
    // BrowserSync Task
    browserSync: {
      bsFiles: {
        src: [
          "./dist/css/*.css",
          "./*.html",
          "./js/*.js",
        ]
      },
      options: {
        server: {
          baseDir: "./"
        }
      }
    },
    sass: {
      dev: {
        options: {
          lineNumbers: true,
          sourcemap: true,
          sourceComments: "sass",
          outputStyle: 'nested'
        },
        files: {
          'dist/css/main.css': 'scss/main.scss',
        }
      },
      dist: {
        options: {
          compressed: true
        },
        files: {
          'dist/css/main.css': 'scss/main.scss'
        }
      }
    }

  };
  // Initialize the configuration.
  grunt.initConfig(config);

  grunt.registerTask("prodbuild", ['concat', 'sass:dist']);
  grunt.registerTask("devbuild", ['concat', 'sass:dev']);
  grunt.registerTask("default", ['devbuild', 'browserSync', 'watch']);
};
