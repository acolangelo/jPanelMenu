module.exports = function(grunt){
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

   sass: {
      options: {
        quiet: true,
        precision: 5
      },
      dev: {
        options: {
          style: 'compressed',
          noCache: true
        },
        files: {
          'css/style.css' : 'sass/style.scss',
        }
      }
    },

    uglify: {
      dev: {
        options: {
          beautify: false,
          mangle: false
        },
        files: {
          'js/script.min.js' :
          [
            // Include:
            'js/lib/modernizr-2.6.1.min.js',
            'js/lib/respond.js',
            'js/lib/highlight.min.js',
            'js/lib/jquery-1.9.0.js',
            '../jquery.jpanelmenu.js',
            'js/lib/plugins.js',
            'js/script.js',
            // Exclude:
            '!js/script.min.js',
          ],
          'js/example-jRespond.min.js' :
          [
            // Include:
            'js/lib/modernizr-2.6.1.min.js',
            'js/lib/respond.js',
            'js/lib/jRespond.js',
            'js/lib/highlight.min.js',
            'js/lib/jquery-1.9.0.js',
            '../jquery.jpanelmenu.js',
            'js/lib/plugins.js',
            'js/example-jRespond.js',
            // Exclude:
            '!js/example-jRespond.min.js',
          ]
        }
      }
    },

    watch: {
      html: {
        files: ['*.html']
      },
      css: {
        files: ['sass/*.scss'],
        tasks: ['sass:dev']
      },
      js: {
        files: ['js/*.js', '../jquery.jpanelmenu.js', '!js/script.min.js', '!js/example-jRespond.min.js'],
        tasks: ['uglify:dev']
      }
    }
  });

  grunt.registerTask('default', ['sass:dev','uglify:dev','watch']);
};
