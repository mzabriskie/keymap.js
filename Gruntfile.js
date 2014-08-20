/*global module:false*/
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'src/keymap.js']
        },

        uglify: {
            main: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'keymap.min.map',
                    beautify: {
                        'ascii_only': true
                    }
                },
                files: {
                    'keymap.min.js': ['keymap.js']
                }
            }
        }
    });

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('publish', ['jshint', 'uglify']);
};