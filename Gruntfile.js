'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically.
  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  // Configurable paths for the application.
  var appConfig = {
    app: 'app',
    dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({

    // Project settings.
    solfege: appConfig,

    // Watch files for changes and run tasks based on changed files.
    watch: {
      js: {
        files: ['<%= solfege.app %>/js/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      compass: {
        files: ['<%= solfege.app %>/scss/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'postcss']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= solfege.app %>/js/script.js'
        ]
      }
    },

    // Empties folders to start fresh.
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= solfege.dist %>/{,*/}*',
            '!<%= solfege.dist %>/.git'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles.
    postcss: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '{,*/}*.css',
          dest: '.tmp/css/'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested.
    compass: {
      options: {
        sassDir: '<%= solfege.app %>/scss',
        cssDir: '.tmp/css',
        fontsDir: '<%= solfege.app %>/fonts',
        httpFontsDir: '<%= solfege.app %>/fonts',
        javascriptsDir: '<%= solfege.app %>/js'
      },
      dist: {}
    },

    // Renames files for browser caching purposes.
    filerev: {
      dist: {
        src: [
          '<%= solfege.dist %>/js/{,*/}*.js',
          '<%= solfege.dist %>/css/{,*/}*.css',
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify, and revision files. Creates configurations in memory so
    // additional tasks can operate on them.
    useminPrepare: {
      html: '<%= solfege.app %>/index.html',
      options: {
        dest: '<%= solfege.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglify'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and useminPrepare configurations.
    usemin: {
      html: ['<%= solfege.dist %>/{,*/}*.html'],
      css: ['<%= solfege.dist %>/css/{,*/}*.css'],
      options: {
        assetDirs: ['<%= solfege.dist %>']
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= solfege.dist %>',
          src: ['*.html'],
          dest: '<%= solfege.dist %>'
        }]
      }
    },

    // Replace configuration placeholders.
    // Works on concatenated (temporary) Javascript files, so must be run before
    // the files are moved to the final build destination.
    replace: {
      dist: {
        options: {
          patterns: [{
            json: grunt.file.readJSON(appConfig.app + '/config/config.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['.tmp/concat/js/{,*/}*.js'],
          dest: '.tmp/concat/js/'
        }]
      }
    },


    // Copies remaining files to places other tasks can use.
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= solfege.app %>',
          dest: '<%= solfege.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'fonts/*'
          ]
        }]
      }
    },

    concurrent: {
      dist: [
        'compass:dist'
      ]
    }

  });

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'postcss',
    'concat',
    'replace',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);

};
