/*
 *
 */


module.exports = function(grunt) {
    
    var pkg = grunt.file.readJSON('package.json');
    var banner = '\
/*\n\
 * tmlib.native.js <%= version %>\n\
 * MIT Licensed\n\
 * \n\
 * Copyright (C) 2010 phi, https://twitter.com/phi_jp\n\
 */\n\n\
';
    
    var target = [
        "scripts/api.js",
        "scripts/nativeaudio.js",
    ];

    grunt.initConfig({
        version: pkg.version,

        concat: {
            main: {
                src: target,
                dest: 'tmlib.native.js',
                options: {
                    banner: banner,
                },
            },
        },
        uglify: {
            main: {
                options: {},
                files: {
                    'tmlib.native.min.js': 'tmlib.native.js',
                }
            }
        }
    });

    for (var key in pkg.devDependencies) {
        if (/grunt-/.test(key)) {
            grunt.loadNpmTasks(key);
        }
    }
    grunt.task.loadTasks("tasks");

    grunt.registerTask('default', ['concat:main', 'uglify:main']);
};
