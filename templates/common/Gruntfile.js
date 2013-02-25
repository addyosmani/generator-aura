'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha');

  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  var PORT = 8765;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    yeoman: yeomanConfig,
    connect: {
      server: {
        options: {
          port: PORT,
          base: '.'
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: '.',
          optimize: 'none',
          paths: {
            aura: 'app/components/aura/lib',
            jquery: 'empty:',
            underscore: 'empty:',
            eventemitter: 'app/components/eventemitter2/lib/eventemitter2'
          },
          shim: {
            underscore: {
              exports: '_'
            }
          },
          include: [
            'app/main'
          ],
          exclude: ['jquery', 'aura/aura'],
          out: '<%= yeoman.dist %>/main.js'
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt,js,html}',
            '.htaccess',
            'components/**/*',
            'images/**/*',
            'styles/**/*',
            'widgets/**/*',
            'extensions/**/*'
          ]
        }]
      }
    },
    jshint: {
      all: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: [
          'app/widgets/**.js',
          'app/extensions/**.js',
          'app/main.js',
          ]
        }
      }
    },
    mocha: {
      all: {
        options: {
          urls: ['http://localhost:<%= connect.server.options.port %>/spec/index.html']
        }
      }
    },
    watch: {
      files: [
        '**/*.js'
      ],
      tasks: ['spec']
    },
    clean: {
      dist: ['<%= yeoman.dist %>/**']
    }
  });

  grunt.registerTask('spec', ['jshint', 'connect', 'mocha']);
  grunt.registerTask('build', ['clean', 'spec', 'copy', 'requirejs']);
  grunt.registerTask('default', ['spec', 'watch']);
};
