/*global module:false*/
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-update-json');

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
        },

        update_json: {
            bower: {
                src: 'package.json',
                dest: 'bower.json',
                fields: [
                    'name',
                    'description',
                    'version',
                    'homepage',
                    'license',
                    'keywords'
                ]
            }
        }
    });

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('publish', ['jshint', 'uglify', 'update_json']);
};