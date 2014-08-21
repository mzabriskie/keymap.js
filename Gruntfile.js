/*global module:false*/
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/* <%= pkg.name %> v<%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> by Matt Zabriskie */\n'
        },

        jshint: {
            main: ['Gruntfile.js', 'src/keymap.js']
        },

        clean: {
            main: 'dist/**'
        },

        copy: {
            main: {
                files: [
                    {src: 'src/keymap.js', dest: 'dist/', expand: true, flatten: true}
                ]
            }
        },

        uglify: {
            main: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'dist/keymap.min.map',
                    beautify: {
                        'ascii_only': true
                    }
                },
                files: {
                    'dist/keymap.min.js': ['dist/keymap.js']
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
                    src: ['dist/keymap.min.js']
                }
            }
        },

        update_json: {
            main: {
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
        },

        replace: {
            main: {
                options: {
                    patterns: [
                        {
                            match: 'version',
                            replacement: '<%= pkg.version %>'
                        }
                    ]
                },
                files: [
                    {src: 'dist/keymap.js', dest: 'dist/', expand: true, flatten: true},
                    {src: 'dist/keymap.min.js', dest: 'dist/', expand: true, flatten: true}
                ]
            }
        }
    });

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('publish', ['jshint', 'clean', 'copy', 'uglify', 'usebanner', 'replace', 'update_json']);
};