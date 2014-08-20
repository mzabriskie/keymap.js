/*global module:false*/
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/* <%= pkg.name %> v<%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> by Matt Zabriskie */\n'
        },

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

        usebanner: {
            main: {
                options: {
                    banner: '<%= meta.banner %>',
                    linebreak: false
                },
                files: {
                    src: ['keymap.min.js']
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
    grunt.registerTask('publish', ['jshint', 'uglify', 'usebanner', 'update_json']);
};